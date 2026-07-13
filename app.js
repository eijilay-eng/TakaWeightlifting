document.addEventListener('DOMContentLoaded', () => {
  // App State
  let appState = {
    activeTab: 'training', // 'training' | 'meso' | 'settings'
    activeUnit: 'kg', // 'kg' | 'lb'
    currentWeekIndex: 0,
    currentDayIndex: 0,
    user1RMs: {
      snatch: 60,
      clean: 80,
      backSquat: 100,
      frontSquat: 90
    },
    program: null,
    completedExercises: {}, // Keys format: weekId_dayId_exerciseIndex
    theme: 'dark' // 'dark' | 'light'
  };

  // Timer State
  let timerState = {
    duration: 90,
    remaining: 0,
    intervalId: null,
    running: false
  };

  // Sound Synthesizer for Timer (Offline friendly)
  function playAlertSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Beep 1 (Higher frequency)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gain1.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc1.start(audioCtx.currentTime);
      osc1.stop(audioCtx.currentTime + 0.3);

      // Beep 2 (Slightly delayed, even higher frequency)
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1046.5, audioCtx.currentTime); // C6
        gain2.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc2.start(audioCtx.currentTime);
        osc2.stop(audioCtx.currentTime + 0.4);
      }, 150);

      // Vibrate mobile if API is available
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    } catch (e) {
      console.warn("Could not play synthesized audio alert:", e);
    }
  }

  // Load state from localStorage or defaults
  function initLocalStorage() {
    // 1. Theme
    const savedTheme = localStorage.getItem('wl_theme');
    if (savedTheme) {
      appState.theme = savedTheme;
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-icon').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
    }

    // 2. Unit
    const savedUnit = localStorage.getItem('wl_unit');
    if (savedUnit) {
      appState.activeUnit = savedUnit;
      updateUnitSliderUI();
    }

    // 3. 1RMs
    const saved1RMs = localStorage.getItem('wl_1RMs');
    if (saved1RMs) {
      appState.user1RMs = JSON.parse(saved1RMs);
    } else {
      // Default 1RMs in current unit (defaults to kg. If default unit is lb, convert them)
      if (appState.activeUnit === 'lb') {
        appState.user1RMs = {
          snatch: Math.round(60 * 2.20462),
          clean: Math.round(80 * 2.20462),
          backSquat: Math.round(100 * 2.20462),
          frontSquat: Math.round(90 * 2.20462)
        };
      }
    }

    // 4. Program (Routine)
    const savedProgram = localStorage.getItem('wl_program_v6');
    if (savedProgram) {
      appState.program = JSON.parse(savedProgram);
      // Sanitizar nombres de semanas para remover fases ATR o detalles (ej: "Semana 1: Acumulación" -> "Semana 1")
      let hasChanges = false;
      appState.program.weeks.forEach(week => {
        if (week.name.includes(':')) {
          week.name = week.name.split(':')[0].trim();
          hasChanges = true;
        }
      });
      if (hasChanges) {
        localStorage.setItem('wl_program_v6', JSON.stringify(appState.program));
      }
    } else {
      appState.program = JSON.parse(JSON.stringify(window.defaultProgram)); // deep clone
      localStorage.setItem('wl_program_v6', JSON.stringify(appState.program));
    }

    // 5. Completed Exercises
    const savedCompleted = localStorage.getItem('wl_completed');
    if (savedCompleted) {
      appState.completedExercises = JSON.parse(savedCompleted);
    }
  }

  // Save specific values to localStorage
  function saveStateToStorage() {
    localStorage.setItem('wl_1RMs', JSON.stringify(appState.user1RMs));
    localStorage.setItem('wl_unit', appState.activeUnit);
    localStorage.setItem('wl_program_v6', JSON.stringify(appState.program));
    localStorage.setItem('wl_completed', JSON.stringify(appState.completedExercises));
  }

  // Display Toast Message
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Unit conversions (Round to closest 0.5 or integer)
  function convertKgToLb(kgVal) {
    return Math.round(kgVal * 2.20462);
  }

  function convertLbToKg(lbVal) {
    return Math.round(lbVal / 2.20462);
  }

  // Handle Unit Toggle
  function toggleUnit() {
    const prevUnit = appState.activeUnit;
    appState.activeUnit = prevUnit === 'kg' ? 'lb' : 'kg';
    
    // Convert 1RMs accordingly to keep numbers equivalent
    if (appState.activeUnit === 'lb') {
      appState.user1RMs.snatch = convertKgToLb(appState.user1RMs.snatch);
      appState.user1RMs.clean = convertKgToLb(appState.user1RMs.clean);
      appState.user1RMs.backSquat = convertKgToLb(appState.user1RMs.backSquat);
      appState.user1RMs.frontSquat = convertKgToLb(appState.user1RMs.frontSquat);
    } else {
      appState.user1RMs.snatch = convertLbToKg(appState.user1RMs.snatch);
      appState.user1RMs.clean = convertLbToKg(appState.user1RMs.clean);
      appState.user1RMs.backSquat = convertLbToKg(appState.user1RMs.backSquat);
      appState.user1RMs.frontSquat = convertLbToKg(appState.user1RMs.frontSquat);
    }

    updateUnitSliderUI();
    saveStateToStorage();
    render1RMInputs();
    renderWorkout();
    render1RMBar();
    showToast(`Unidades cambiadas a ${appState.activeUnit.toUpperCase()}`);
  }

  function updateUnitSliderUI() {
    const toggleBtn = document.getElementById('unit-toggle');
    if (appState.activeUnit === 'lb') {
      toggleBtn.classList.add('lb-active');
    } else {
      toggleBtn.classList.remove('lb-active');
    }
    // Update active label status
    document.getElementById('lbl-kg').className = appState.activeUnit === 'kg' ? 'active' : '';
    document.getElementById('lbl-lb').className = appState.activeUnit === 'lb' ? 'active' : '';
  }

  // Toggle Theme (Dark / Light)
  function toggleTheme() {
    const isDark = !document.body.classList.contains('light-theme');
    const themeIcon = document.getElementById('theme-icon');
    if (isDark) {
      document.body.classList.add('light-theme');
      appState.theme = 'light';
      themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    } else {
      document.body.classList.remove('light-theme');
      appState.theme = 'dark';
      themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    }
    localStorage.setItem('wl_theme', appState.theme);
  }

  // Calculate dynamic weight (rounded to nearest 0.5 or integer)
  function calculateWeight(reference, percentage) {
    if (!reference || percentage === null || percentage === undefined) {
      return null;
    }
    const baseWeight = appState.user1RMs[reference] || 0;
    const calc = (baseWeight * percentage) / 100;
    
    // Round to 1 decimal place. To avoid numbers like .2 or .7, round to closest 0.5 or integer.
    // In powerlifting/weightlifting, increments are typically 0.5 or 1 kg/lb.
    const rounded = Math.round(calc * 2) / 2;
    return rounded;
  }

  // Handle Tab Switch
  function switchTab(tabId) {
    appState.activeTab = tabId;
    
    // Update nav bar classes
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.dataset.tab === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update visibility of divs
    document.querySelectorAll('.tab-content').forEach(content => {
      if (content.id === `${tabId}-tab`) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    if (tabId === 'training') {
      renderWorkout();
      render1RMBar();
    } else if (tabId === 'meso') {
      renderMesoTab();
    } else if (tabId === 'settings') {
      renderSettingsTab();
    }
  }

  // Render 1RM Quick bar in Routine Tab
  function render1RMBar() {
    const bar = document.getElementById('rm-bar');
    if (!bar) return;
    
    const unit = appState.activeUnit.toUpperCase();
    bar.innerHTML = `
      <span>SN: <strong>${appState.user1RMs.snatch}${unit}</strong></span>
      <span>CJ: <strong>${appState.user1RMs.clean}${unit}</strong></span>
      <span>BS: <strong>${appState.user1RMs.backSquat}${unit}</strong></span>
      <span>FS: <strong>${appState.user1RMs.frontSquat}${unit}</strong></span>
    `;
  }

  // Render 1RM fields in Settings Tab
  function render1RMInputs() {
    document.getElementById('rm-snatch').value = appState.user1RMs.snatch;
    document.getElementById('rm-clean').value = appState.user1RMs.clean;
    document.getElementById('rm-backsquat').value = appState.user1RMs.backSquat;
    document.getElementById('rm-frontsquat').value = appState.user1RMs.frontSquat;
    
    // Update labels with unit suffix
    const unitText = appState.activeUnit.toUpperCase();
    document.getElementById('lbl-snatch-unit').textContent = `(${unitText})`;
    document.getElementById('lbl-clean-unit').textContent = `(${unitText})`;
    document.getElementById('lbl-backsquat-unit').textContent = `(${unitText})`;
    document.getElementById('lbl-frontsquat-unit').textContent = `(${unitText})`;
  }

  // Render Week Selector Tabs in Routine View
  function renderWeekSelector() {
    const selector = document.getElementById('week-selector');
    if (!selector) return;
    selector.innerHTML = '';

    if (!appState.program || !appState.program.weeks.length) {
      selector.innerHTML = `<p class="empty-state">No hay semanas cargadas</p>`;
      return;
    }

    appState.program.weeks.forEach((week, index) => {
      const tab = document.createElement('div');
      tab.className = `week-tab ${index === appState.currentWeekIndex ? 'active' : ''}`;
      tab.textContent = `S${index + 1}`;
      tab.title = week.name;
      tab.addEventListener('click', () => {
        appState.currentWeekIndex = index;
        renderWeekSelector();
        renderWorkout();
      });
      selector.appendChild(tab);
    });
  }

  // Render Day Selector Tabs in Routine View
  function renderDaySelector() {
    const selector = document.getElementById('day-selector');
    if (!selector) return;
    selector.innerHTML = '';

    const week = appState.program.weeks[appState.currentWeekIndex];
    if (!week || !week.days || !week.days.length) return;

    week.days.forEach((day, index) => {
      const tab = document.createElement('div');
      tab.className = `day-tab ${index === appState.currentDayIndex ? 'active' : ''}`;
      tab.textContent = `Día ${index + 1}`;
      tab.title = day.name;
      tab.addEventListener('click', () => {
        appState.currentDayIndex = index;
        renderDaySelector();
        renderWorkout();
      });
      selector.appendChild(tab);
    });
  }

  // Render the Exercise Cards for the Selected Day
  function renderWorkout() {
    renderWeekSelector();
    renderDaySelector();

    const workoutArea = document.getElementById('workout-area');
    if (!workoutArea) return;
    workoutArea.innerHTML = '';

    const week = appState.program.weeks[appState.currentWeekIndex];
    const day = week ? week.days[appState.currentDayIndex] : null;

    if (!week || !day || !day.exercises || !day.exercises.length) {
      workoutArea.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <p>No hay programación cargada para este día.</p>
        </div>
      `;
      return;
    }

    // Render Focus Card (Weekly goal & Daily summary title)
    const focusCard = document.createElement('div');
    focusCard.className = 'focus-card';
    const cleanWeekName = week.name.includes(':') ? week.name.split(':')[0].trim() : week.name;
    focusCard.innerHTML = `
      <h3>${cleanWeekName} - ${day.name}</h3>
      <p><strong>Foco de la Semana:</strong> ${week.focus}</p>
    `;
    workoutArea.appendChild(focusCard);

    // Render Exercise List
    const listContainer = document.createElement('div');
    listContainer.className = 'exercise-list';

    day.exercises.forEach((ex, index) => {
      const completionKey = `${week.id || 'w' + appState.currentWeekIndex}_${day.id || 'd' + appState.currentDayIndex}_${index}`;
      const isCompleted = !!appState.completedExercises[completionKey];

      const calculatedVal = calculateWeight(ex.reference, ex.percentage);
      const weightDisplay = calculatedVal !== null 
        ? `${calculatedVal} ${appState.activeUnit}` 
        : ex.displayPercentage || 'Auto';

      const card = document.createElement('div');
      
      // Detect accessory divider and accessory items
      const isAccessoryDivider = ex.name && ex.name.includes('ACCESORIOS');
      const isAccessoryItem = !isAccessoryDivider && ex.displayPercentage === 'Accesorio';
      
      card.className = `exercise-card ${isCompleted ? 'completed' : ''} ${isAccessoryDivider ? 'accessory-divider' : ''} ${isAccessoryItem ? 'accessory-item' : ''}`;

      card.dataset.index = index;

      let metaHTML = '';
      let seriesList = [];
      
      if (ex.series && ex.series.length > 0) {
        seriesList = ex.series;
      } else if (ex.displayPercentage && ex.displayPercentage.toString().includes('/')) {
        // Auto-split slash separated lists (e.g. "50% / 60% / 65%")
        const pcts = ex.displayPercentage.split('/');
        const repsVal = (ex.reps || '').toString().split('/');
        const setsVal = (ex.sets || '').toString().split('/');
        const numItems = pcts.length;
        
        for (let i = 0; i < numItems; i++) {
          const pctStr = pcts[i].trim();
          const repStr = repsVal[i] ? repsVal[i].trim() : (repsVal[0] ? repsVal[0].trim() : '1');
          
          let sCount = 1;
          if (setsVal[i]) {
            sCount = parseInt(setsVal[i].trim()) || 1;
          } else if (setsVal.length === 1 && !isNaN(parseInt(setsVal[0]))) {
            sCount = Math.ceil(parseInt(setsVal[0]) / numItems);
          }
          
          let pctNum = null;
          const match = pctStr.match(/(\d+(?:\.\d+)?)/);
          if (match) {
            pctNum = parseFloat(match[1]);
          }
          
          seriesList.push({
            sets: sCount,
            reps: repStr,
            percentage: pctNum,
            displayPercentage: pctStr
          });
        }
      }

      if (seriesList.length > 0) {
        // Complex sets list layout
        const totalSets = seriesList.reduce((sum, s) => sum + s.sets, 0);
        let seriesRowsHTML = '';
        
        seriesList.forEach(s => {
          const sCalcVal = calculateWeight(ex.reference, s.percentage);
          const sWeightDisplay = sCalcVal !== null 
            ? `${sCalcVal} ${appState.activeUnit}` 
            : s.displayPercentage || 'Auto';
          
          seriesRowsHTML += `
            <div class="series-row">
              <div class="series-col"><strong>${s.sets}</strong> x <strong>${s.reps}</strong></div>
              <div class="series-col">${s.displayPercentage || (s.percentage ? s.percentage + '%' : '')}</div>
              <div class="series-col weight">${sWeightDisplay}</div>
            </div>
          `;
        });

        metaHTML = `
          <div class="exercise-meta-complex">
            <div class="meta-complex-header" style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary); margin-bottom:8px; padding:0 4px;">
              <span>Total: <strong>${totalSets} series</strong></span>
              <span class="rest-click" data-rest="${ex.rest}" style="cursor:pointer; text-decoration:underline; text-decoration-style:dotted; color:var(--primary-neon); display:flex; align-items:center; gap:3px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Descanso: <strong>${ex.rest}</strong>
              </span>
            </div>
            <div class="exercise-series-list">
              ${seriesRowsHTML}
            </div>
          </div>
        `;
      } else {
        // Standard single series layout
        const calculatedVal = calculateWeight(ex.reference, ex.percentage);
        const weightDisplay = calculatedVal !== null 
          ? `${calculatedVal} ${appState.activeUnit}` 
          : ex.displayPercentage || 'Auto';

        metaHTML = `
          <div class="exercise-meta">
            <div class="meta-item">
              <span class="meta-label">Series x Reps</span>
              <span class="meta-value">${ex.sets} x ${ex.reps}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Carga (% / Peso)</span>
              <span class="meta-value weight">${ex.displayPercentage ? ex.displayPercentage : ''} (${weightDisplay})</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Descanso</span>
              <span class="meta-value rest-click" data-rest="${ex.rest}">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:-1px; margin-right:2px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${ex.rest}
              </span>
            </div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="exercise-header">
          <div class="exercise-title-area">
            <span class="exercise-number">Ejercicio ${index + 1}</span>
            <span class="exercise-name">${ex.name}</span>
          </div>
          <button class="check-btn" title="Completar ejercicio">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
        </div>
        
        ${metaHTML}

        <button class="exercise-tips-toggle" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          <span>Instrucciones y Foco Técnico</span>
        </button>
        
        <div class="exercise-details">
          <p><strong>Ejecución:</strong> ${ex.detail || 'Seguir el patrón estándar.'}</p>
          <div class="tip-box">
            <strong>Foco Técnico:</strong> ${ex.foco || 'Foco en la velocidad y estabilidad del levantamiento.'}
          </div>
        </div>
      `;

      // Event listener for Expandable coaching tips
      const toggleBtn = card.querySelector('.exercise-tips-toggle');
      const detailsDiv = card.querySelector('.exercise-details');
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = detailsDiv.style.display === 'block';
        detailsDiv.style.display = isOpen ? 'none' : 'block';
        toggleBtn.classList.toggle('open', !isOpen);
      });

      // Event listener for Checkbox Completion
      const checkBtn = card.querySelector('.check-btn');
      checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleExerciseCompleted(completionKey, card);
      });

      // Event listener for Quick Rest Timer click
      const restBtn = card.querySelector('.rest-click');
      if (restBtn) {
        restBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const restVal = restBtn.dataset.rest;
          startQuickTimer(restVal);
        });
      }

      listContainer.appendChild(card);
    });

    workoutArea.appendChild(listContainer);
  }

  // Toggle exercise completed state
  function toggleExerciseCompleted(key, cardElement) {
    if (appState.completedExercises[key]) {
      delete appState.completedExercises[key];
      cardElement.classList.remove('completed');
    } else {
      appState.completedExercises[key] = true;
      cardElement.classList.add('completed');
      
      // Trigger a light haptic sensation if on mobile
      if (navigator.vibrate) {
        navigator.vibrate(40);
      }
    }
    saveStateToStorage();
    
    // If inside meso view, we should update completion percentage too
    updateMesoProgressUI();
  }

  // Update total progress bar in Meso view
  function updateMesoProgressUI() {
    const progBar = document.getElementById('meso-progress-bar');
    const progPctText = document.getElementById('meso-progress-pct');
    if (!progBar || !appState.program) return;

    let totalExercises = 0;
    let completedCount = 0;

    appState.program.weeks.forEach(week => {
      week.days.forEach(day => {
        if (day.exercises) {
          day.exercises.forEach((_, idx) => {
            totalExercises++;
            const key = `${week.id}_${day.id}_${idx}`;
            if (appState.completedExercises[key]) {
              completedCount++;
            }
          });
        }
      });
    });

    const pct = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;
    progBar.style.width = `${pct}%`;
    progPctText.textContent = `${pct}% Completado`;
  }

  // Render Mesocycle (Monthly) Tab
  function renderMesoTab() {
    const timeline = document.getElementById('week-timeline');
    if (!timeline) return;
    timeline.innerHTML = '';

    updateMesoProgressUI();

    if (!appState.program || !appState.program.weeks.length) {
      timeline.innerHTML = `<p class="empty-state">No hay semanas cargadas</p>`;
      return;
    }

    appState.program.weeks.forEach((week, index) => {
      // Calculate completion of this week
      let totalWeekEx = 0;
      let completedWeekEx = 0;
      
      week.days.forEach(day => {
        if (day.exercises) {
          day.exercises.forEach((_, idx) => {
            totalWeekEx++;
            const key = `${week.id}_${day.id}_${idx}`;
            if (appState.completedExercises[key]) {
              completedWeekEx++;
            }
          });
        }
      });

      const isCurrent = index === appState.currentWeekIndex;
      const isCompleted = totalWeekEx > 0 && completedWeekEx === totalWeekEx;
      
      let badgeText = '';
      if (isCurrent) badgeText = 'Semana Activa';
      else if (isCompleted) badgeText = 'Completada';
      else badgeText = `${completedWeekEx}/${totalWeekEx} Ejercicios`;

      const node = document.createElement('div');
      node.className = `timeline-node ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`;
      const cleanWeekName = week.name.includes(':') ? week.name.split(':')[0].trim() : week.name;
      node.innerHTML = `
        <div class="node-header">
          <span class="node-title">${cleanWeekName}</span>
          <span class="node-badge">${badgeText}</span>
        </div>
        <div class="node-focus">
          <strong>Foco:</strong> ${week.focus}
        </div>
      `;

      // Click node to quick jump to this week
      node.addEventListener('click', () => {
        appState.currentWeekIndex = index;
        appState.currentDayIndex = 0;
        switchTab('training');
      });

      timeline.appendChild(node);
    });
  }

  // Render Settings Tab
  function renderSettingsTab() {
    render1RMInputs();
    
    // Fill current weeks stored descriptions
    const weeksList = document.getElementById('current-weeks-list');
    if (weeksList && appState.program) {
      weeksList.innerHTML = '';
      appState.program.weeks.forEach((week, idx) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justify = 'space-between';
        item.style.alignItems = 'center';
        item.style.padding = '8px 10px';
        item.style.background = 'rgba(255,255,255,0.02)';
        item.style.border = '1px solid rgba(255,255,255,0.05)';
        item.style.borderRadius = '8px';
        item.style.marginBottom = '6px';
        item.style.fontSize = '0.8rem';
        
        item.innerHTML = `
          <div>
            <strong>Semana ${idx + 1}:</strong> ${week.name.split(':')[1] || week.name} 
            <span style="font-size: 0.7rem; color: var(--text-muted);">(${week.id})</span>
          </div>
        `;
        weeksList.appendChild(item);
      });
    }
  }

  // Parse rest string and start timer (e.g. "90s" or "2 min" or "2-3 min")
  function startQuickTimer(restStr) {
    let seconds = 90; // Default fallback
    
    // Clean string and try to match
    const cleanStr = restStr.toLowerCase().trim();
    if (cleanStr.includes('min')) {
      // E.g. "2 min" or "2-3 min" (we'll take the lower or average, let's take average/first number)
      const num = parseInt(cleanStr);
      if (!isNaN(num)) {
        seconds = num * 60;
      }
    } else if (cleanStr.includes('s')) {
      const num = parseInt(cleanStr);
      if (!isNaN(num)) {
        seconds = num;
      }
    }

    timerState.duration = seconds;
    timerState.remaining = seconds;
    
    // Open floating timer UI
    document.getElementById('timer-section').style.display = 'flex';
    
    startTimerInterval();
    switchTab('training'); // Bring user back to training if they clicked a rest timer
    showToast(`Temporizador iniciado: ${restStr}`);
  }

  function startTimerInterval() {
    if (timerState.intervalId) {
      clearInterval(timerState.intervalId);
    }
    
    timerState.running = true;
    updateTimerUI();

    timerState.intervalId = setInterval(() => {
      timerState.remaining--;
      updateTimerUI();

      if (timerState.remaining <= 0) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
        timerState.running = false;
        
        // Alert
        document.getElementById('timer-count').classList.add('finished');
        document.getElementById('timer-count').textContent = "¡Tiempo!";
        playAlertSound();
      }
    }, 1000);
  }

  function toggleTimerRun() {
    const countEl = document.getElementById('timer-count');
    countEl.classList.remove('finished');

    if (timerState.running) {
      // Pause
      clearInterval(timerState.intervalId);
      timerState.intervalId = null;
      timerState.running = false;
      document.getElementById('btn-timer-play').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    } else {
      // Resume / Start
      if (timerState.remaining <= 0) {
        timerState.remaining = timerState.duration;
      }
      startTimerInterval();
      document.getElementById('btn-timer-play').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
    }
  }

  function resetTimer() {
    clearInterval(timerState.intervalId);
    timerState.intervalId = null;
    timerState.running = false;
    timerState.remaining = timerState.duration;
    
    const countEl = document.getElementById('timer-count');
    countEl.classList.remove('finished');
    
    updateTimerUI();
    document.getElementById('btn-timer-play').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
  }

  function closeTimerWidget() {
    clearInterval(timerState.intervalId);
    timerState.intervalId = null;
    timerState.running = false;
    timerState.remaining = 0;
    document.getElementById('timer-section').style.display = 'none';
  }

  function updateTimerUI() {
    const countEl = document.getElementById('timer-count');
    if (!countEl) return;
    
    if (timerState.remaining > 0) {
      const min = Math.floor(timerState.remaining / 60);
      const sec = timerState.remaining % 60;
      countEl.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
      countEl.className = 'timer-countdown running';
      
      // Update Play Button Icon to pause state
      document.getElementById('btn-timer-play').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
    } else if (!timerState.running && countEl.textContent !== "¡Tiempo!") {
      const min = Math.floor(timerState.duration / 60);
      const sec = timerState.duration % 60;
      countEl.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
      countEl.className = 'timer-countdown';
      
      // Update Play Button Icon to play state
      document.getElementById('btn-timer-play').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }
  }

  // Handle dynamic imports of new routines
  function importNewWeek() {
    const textarea = document.getElementById('import-json-area');
    const jsonStr = textarea.value.trim();

    if (!jsonStr) {
      showToast("Error: El área de texto está vacía.");
      return;
    }

    try {
      const newWeek = JSON.parse(jsonStr);

      // Validate JSON structure
      if (!newWeek.id || !newWeek.name || !newWeek.focus || !newWeek.days) {
        throw new Error("El JSON debe contener 'id', 'name', 'focus' y 'days'.");
      }

      // Sanitizar nombre de semana (ej: "Semana 5: Fuerza Máxima" -> "Semana 5")
      if (newWeek.name.includes(':')) {
        newWeek.name = newWeek.name.split(':')[0].trim();
      }
      if (!Array.isArray(newWeek.days) || newWeek.days.length === 0) {
        throw new Error("El campo 'days' debe ser una lista de días.");
      }

      // Check exercises format in days
      newWeek.days.forEach((day, dIdx) => {
        if (!day.id || !day.name || !day.exercises) {
          throw new Error(`El día ${dIdx + 1} debe contener 'id', 'name' y 'exercises'.`);
        }
        if (!Array.isArray(day.exercises)) {
          throw new Error(`Los ejercicios del día ${dIdx + 1} deben ser una lista.`);
        }
      });

      // Valid structure! Let's insert into the program.
      // Append to the list
      appState.program.weeks.push(newWeek);

      let shifted = false;
      // Keep only the most recent 4 weeks
      if (appState.program.weeks.length > 4) {
        const removedWeek = appState.program.weeks.shift();
        
        // Clean up completed exercises history for the removed week to save space
        cleanUpCompletedHistory(removedWeek.id);
        shifted = true;
      }

      // Reset current selected week index to the newly loaded week (which is the last one)
      appState.currentWeekIndex = appState.program.weeks.length - 1;
      appState.currentDayIndex = 0;

      // Save changes
      saveStateToStorage();
      textarea.value = ''; // clear input
      
      // Update UI
      renderWeekSelector();
      renderWorkout();
      renderSettingsTab();
      
      if (shifted) {
        showToast("Semana importada con éxito. Se eliminó la semana más antigua (Límite: 4).");
      } else {
        showToast("Semana importada con éxito.");
      }
    } catch (err) {
      alert(`Error al importar el JSON: ${err.message}`);
      console.error(err);
    }
  }

  // Clean up completed exercises list for a removed week ID
  function cleanUpCompletedHistory(weekId) {
    const keys = Object.keys(appState.completedExercises);
    keys.forEach(key => {
      if (key.startsWith(`${weekId}_`)) {
        delete appState.completedExercises[key];
      }
    });
  }

  // Reset program to the default initial mesocycle
  function resetToDefaultProgram() {
    if (confirm("¿Estás seguro de que quieres restablecer el programa? Se borrarán las semanas personalizadas cargadas y el progreso actual.")) {
      appState.program = JSON.parse(JSON.stringify(window.defaultProgram));
      appState.completedExercises = {};
      appState.currentWeekIndex = 0;
      appState.currentDayIndex = 0;
      
      saveStateToStorage();
      renderWeekSelector();
      renderWorkout();
      renderSettingsTab();
      showToast("Programa restablecido por defecto.");
    }
  }

  // Clear completed check marks for current week
  function clearCurrentWeekProgress() {
    if (confirm("¿Restablecer el progreso de la semana actual?")) {
      const currentWeek = appState.program.weeks[appState.currentWeekIndex];
      if (currentWeek) {
        const keys = Object.keys(appState.completedExercises);
        keys.forEach(key => {
          if (key.startsWith(`${currentWeek.id}_`)) {
            delete appState.completedExercises[key];
          }
        });
        saveStateToStorage();
        renderWorkout();
        showToast("Progreso semanal restablecido.");
      }
    }
  }

  // Set up all static event listeners
  function setupEventListeners() {
    // Nav Tabs
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(item.dataset.tab);
      });
    });

    // Theme toggle
    document.getElementById('theme-btn').addEventListener('click', toggleTheme);

    // Unit toggle
    document.getElementById('unit-toggle').addEventListener('click', toggleUnit);

    // 1RM Inputs change events
    const update1RMs = () => {
      const sn = parseFloat(document.getElementById('rm-snatch').value) || 0;
      const cj = parseFloat(document.getElementById('rm-clean').value) || 0;
      const bs = parseFloat(document.getElementById('rm-backsquat').value) || 0;
      const fs = parseFloat(document.getElementById('rm-frontsquat').value) || 0;

      appState.user1RMs = {
        snatch: sn,
        clean: cj,
        backSquat: bs,
        frontSquat: fs
      };
      saveStateToStorage();
    };

    document.getElementById('rm-snatch').addEventListener('input', update1RMs);
    document.getElementById('rm-clean').addEventListener('input', update1RMs);
    document.getElementById('rm-backsquat').addEventListener('input', update1RMs);
    document.getElementById('rm-frontsquat').addEventListener('input', update1RMs);

    // Import and reset buttons
    document.getElementById('btn-import-week').addEventListener('click', importNewWeek);
    document.getElementById('btn-reset-program').addEventListener('click', resetToDefaultProgram);
    document.getElementById('btn-clear-progress').addEventListener('click', clearCurrentWeekProgress);

    // Timer controls
    document.getElementById('btn-timer-play').addEventListener('click', toggleTimerRun);
    document.getElementById('btn-timer-reset').addEventListener('click', resetTimer);
    document.getElementById('btn-timer-close').addEventListener('click', closeTimerWidget);

    // Quick Copy JSON Template to textarea
    document.getElementById('btn-copy-template').addEventListener('click', () => {
      const template = {
        id: "week_custom_" + Date.now().toString().slice(-4),
        name: "Semana Nueva: Fuerza Máxima",
        focus: "Desarrollo de fuerza concéntrica y empuje.",
        days: [
          {
            id: "day1",
            name: "Día 1: Arrancada Técnica",
            exercises: [
              {
                name: "Snatch Balance",
                reference: "snatch",
                percentage: 70,
                displayPercentage: "70%",
                reps: "2",
                sets: 4,
                rest: "90s",
                detail: "Caídas rápidas bajo la barra.",
                foco: "Bloqueo rápido de codos."
              },
              {
                name: "Snatch (Clásico)",
                reference: "snatch",
                percentage: 78,
                displayPercentage: "75-80%",
                reps: "1",
                sets: 5,
                rest: "2 min",
                detail: "Levantamiento clásico completo.",
                foco: "Postura estable en el jalón."
              },
              {
                name: "Snatch Pull",
                reference: "snatch",
                percentage: 95,
                displayPercentage: "95%",
                reps: "3",
                sets: 4,
                rest: "90s",
                detail: "Tirón pesado de arrancada.",
                foco: "Extensión total del cuerpo."
              },
              {
                name: "Back Squat",
                reference: "backSquat",
                percentage: 80,
                displayPercentage: "80%",
                reps: "3",
                sets: 4,
                rest: "3 min",
                detail: "Sentadilla trasera profunda.",
                foco: "Pecho arriba y empuje concéntrico."
              }
            ]
          },
          {
            id: "day2",
            name: "Día 2: Fuerza y Caderas",
            exercises: [
              {
                name: "Power Clean",
                reference: "clean",
                percentage: 75,
                displayPercentage: "75%",
                reps: "2",
                sets: 4,
                rest: "90s",
                detail: "Cargada de potencia.",
                foco: "Extensión explosiva de caderas."
              },
              {
                name: "Push Press",
                reference: "clean",
                percentage: 75,
                displayPercentage: "75%",
                reps: "4",
                sets: 4,
                rest: "90s",
                detail: "Empuje de hombros impulsado con piernas.",
                foco: "Dip vertical y directo."
              },
              {
                name: "Clean Pull",
                reference: "clean",
                percentage: 95,
                displayPercentage: "95%",
                reps: "3",
                sets: 4,
                rest: "2 min",
                detail: "Tirón pesado de cargada.",
                foco: "Mantener los hombros por delante."
              },
              {
                name: "Front Squat",
                reference: "frontSquat",
                percentage: 80,
                displayPercentage: "80%",
                reps: "3",
                sets: 4,
                rest: "3 min",
                detail: "Sentadilla frontal profunda.",
                foco: "Codos altos en la subida."
              }
            ]
          },
          {
            id: "day3",
            name: "Día 3: Complejos y Transferencia",
            exercises: [
              {
                name: "Hang Snatch (sobre rodilla)",
                reference: "snatch",
                percentage: 70,
                displayPercentage: "70%",
                reps: "3",
                sets: 4,
                rest: "90s",
                detail: "Arrancada colgante sobre rodillas.",
                foco: "Mantener la espalda rígida."
              },
              {
                name: "Hang Clean + Jerk",
                reference: "clean",
                percentage: 70,
                displayPercentage: "70%",
                reps: "2 + 1",
                sets: 4,
                rest: "2 min",
                detail: "Cargada colgante + Envión en tijera.",
                foco: "Tijera rápida y recuperación estable."
              },
              {
                name: "Clean Deadlift",
                reference: "clean",
                percentage: 100,
                displayPercentage: "100%",
                reps: "3",
                sets: 3,
                rest: "2 min",
                detail: "Peso muerto con postura de cargada.",
                foco: "Mantener la tensión de espalda."
              },
              {
                name: "Overhead Squat",
                reference: "snatch",
                percentage: 70,
                displayPercentage: "70%",
                reps: "4",
                sets: 3,
                rest: "90s",
                detail: "Sentadilla con agarre de arrancada.",
                foco: "Bloqueo activo sobre la cabeza."
              }
            ]
          }
        ]
      };
      document.getElementById('import-json-area').value = JSON.stringify(template, null, 2);
      showToast("Plantilla copiada. Edítala y presiona Importar.");
    });
  }

  // Start app
  initLocalStorage();
  setupEventListeners();
  
  // Render initial screen
  renderWeekSelector();
  renderWorkout();
  render1RMBar();
});

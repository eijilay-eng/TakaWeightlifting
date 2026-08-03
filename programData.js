const defaultProgram = {
  name: "Taka Weightlifting",
  weeks: [
    {
      "id": "week_1",
      "name": "Semana 1",
      "focus": "Fase de Transición Activa: Cargas Ligeras (30-75%), Variantes Posicionales, 4 Días a la Semana",
      "days": [
        {
          "id": "day1",
          "name": "Día 1: Foco Snatch de Posición, Tempo Squat & Core",
          "exercises": [
            {
              "name": "Muscle Snatch + OHS",
              "reference": "snatch",
              "percentage": 50,
              "displayPercentage": "50%",
              "reps": "3+3",
              "sets": 3,
              "rest": "90s",
              "detail": "3 Muscle Snatches + 3 Overhead Squats por serie. Calentamiento específico y movilidad overhead.",
              "foco": "Extensión limpia de cadera y codos bloqueados arriba."
            },
            {
              "name": "No Feet Squat Snatch",
              "reference": "snatch",
              "rest": "2 min",
              "detail": "Arrancada completa sin despegar los pies del piso. Obliga a usar la cadera y evitar la estrella de mar.",
              "foco": "Extensión completa y entrada rápida manteniendo base sólida.",
              "series": [
                { "sets": 1, "reps": "3", "percentage": 55, "displayPercentage": "55%" },
                { "sets": 3, "reps": "3", "percentage": 60, "displayPercentage": "60%" }
              ]
            },
            {
              "name": "Power Clean + Push Press",
              "reference": "clean",
              "percentage": 60,
              "displayPercentage": "60%",
              "reps": "2+2",
              "sets": 3,
              "rest": "90s",
              "detail": "2 Power Cleans + 2 Push Press por repetición. Calculado sobre Clean & Jerk 1RM.",
              "foco": "Codos rápidos al frente en el clean y empuje continuo en el press."
            },
            {
              "name": "Back Squat (Tempo 3101)",
              "reference": "backSquat",
              "percentage": 60,
              "displayPercentage": "60%",
              "reps": "4",
              "sets": 3,
              "rest": "2 min",
              "detail": "Sentadilla trasera con tempo: 3 segundos de bajada, 1 segundo de pausa abajo, subida explosiva, 1 segundo arriba.",
              "foco": "Control excéntrico en el descenso y rigidez del torso."
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios.",
              "foco": "Estabilidad unilateral y core."
            },
            {
              "name": "Turkish Get Ups",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "4 por lado",
              "sets": 3,
              "rest": "60s",
              "detail": "Levantamiento turco con mancuerna o kettlebell ligera.",
              "foco": "Estabilidad de hombro y movilidad de tronco."
            },
            {
              "name": "Landmine One Leg Deadlift",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "12 por pierna",
              "sets": 3,
              "rest": "60s",
              "detail": "Peso muerto a una pierna utilizando barra landmine.",
              "foco": "Fuerza unilateral e isquiotibiales."
            }
          ]
        },
        {
          "id": "day2",
          "name": "Día 2: Foco Clean, Tijera y Fuerza Posterior",
          "exercises": [
            {
              "name": "Clean Lift Off + Muscle Clean",
              "reference": "clean",
              "percentage": 50,
              "displayPercentage": "50%",
              "reps": "2+2",
              "sets": 3,
              "rest": "90s",
              "detail": "2 Despegues lentos a la rodilla + 2 Cargadas de fuerza por serie.",
              "foco": "Trayectoria pegada al cuerpo en el primer tirón."
            },
            {
              "name": "Low Hang Squat Clean",
              "reference": "clean",
              "rest": "2 min",
              "detail": "Cargada completa de sentadilla desde colgante bajo rodilla.",
              "foco": "Potencia desde posición colgada y codos veloces.",
              "series": [
                { "sets": 2, "reps": "3", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 2, "reps": "2", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "BTN Split Jerk + Split Push Press",
              "reference": "clean",
              "percentage": 40,
              "displayPercentage": "40%",
              "reps": "3+3",
              "sets": 3,
              "rest": "90s",
              "detail": "3 Split Jerks tras nuca + 3 Push Press en tijera. Peso ligero.",
              "foco": "Estabilidad en la tijera y bloqueo rígido de codos."
            },
            {
              "name": "Romanian Deadlift Snatch Grip",
              "reference": "snatch",
              "percentage": 55,
              "displayPercentage": "50-60%",
              "reps": "8",
              "sets": 3,
              "rest": "90s",
              "detail": "Peso muerto rumano con agarre ancho de arrancada.",
              "foco": "Estiramiento activo de isquiotibiales y dorsales activados."
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios.",
              "foco": "Espalda y empuje pectoral."
            },
            {
              "name": "Pull Ups",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "5",
              "sets": 4,
              "rest": "90s",
              "detail": "Dominadas strictly pronadas.",
              "foco": "Rango completo."
            },
            {
              "name": "Weighted Push Ups",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "8-10",
              "sets": 3,
              "rest": "60s",
              "detail": "Flexiones de pecho con disco en la espalda.",
              "foco": "Core firme y empuje de pectoral."
            }
          ]
        },
        {
          "id": "day3",
          "name": "Día 3: Bloques de Potencia, Tijera con Pausa y Sentadilla Frontal",
          "exercises": [
            {
              "name": "Power Snatch from Blocks",
              "reference": "snatch",
              "percentage": 60,
              "displayPercentage": "60%",
              "reps": "3",
              "sets": 4,
              "rest": "90s",
              "detail": "Arrancada de potencia desde bloques a nivel de rodilla.",
              "foco": "Aceleración desde bloques y recepción alta."
            },
            {
              "name": "Tall Jerk",
              "reference": "clean",
              "percentage": 35,
              "displayPercentage": "30-40%",
              "reps": "4",
              "sets": 4,
              "rest": "90s",
              "detail": "Envión desde la posición erguida de puntillas con carga ultra-ligera.",
              "foco": "Rapidez de pies para caer en tijera."
            },
            {
              "name": "Split Jerk w/ pause in receiving (3\")",
              "reference": "clean",
              "percentage": 62,
              "displayPercentage": "60-65%",
              "reps": "2",
              "sets": 3,
              "rest": "2 min",
              "detail": "Envión en tijera con 3 segundos de pausa fija en la recepción.",
              "foco": "Equilibrio y fijación total en la tijera."
            },
            {
              "name": "Front Squats (Hold 2\")",
              "reference": "frontSquat",
              "percentage": 62,
              "displayPercentage": "60-65%",
              "reps": "3",
              "sets": 3,
              "rest": "2 min",
              "detail": "Sentadilla frontal con pausa de 2 segundos en el fondo.",
              "foco": "Codos altos y postura erguida."
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios.",
              "foco": "Empuje de hombros y potencia plio."
            },
            {
              "name": "Landmine Shoulder Press",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "8-10",
              "sets": 3,
              "rest": "60s",
              "detail": "Press de hombro unilateral con barra landmine.",
              "foco": "Empuje diagonal de hombro."
            },
            {
              "name": "High Box Jumps",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "5",
              "sets": 4,
              "rest": "60s",
              "detail": "Saltos a cajón alto enfocados en potencia explosiva.",
              "foco": "Extensión de cadera y amortiguación arriba."
            }
          ]
        },
        {
          "id": "day4",
          "name": "Día 4: Snatch Balance, C&J Flow y Tirones",
          "exercises": [
            {
              "name": "Snatch Balance w/ 4\" pause",
              "reference": "snatch",
              "percentage": 50,
              "displayPercentage": "50%",
              "reps": "3",
              "sets": 3,
              "rest": "90s",
              "detail": "Snatch Balance con pausa de 4 segundos en el fondo de la sentadilla.",
              "foco": "Estabilidad profunda y confianza en el bloqueo."
            },
            {
              "name": "Power Clean + Hang Clean + Push Jerk + Split Jerk",
              "reference": "clean",
              "rest": "2 min",
              "detail": "Complejo dinámico continuo: 1 Power Clean + 1 Hang Clean + 1 Push Jerk + 1 Split Jerk = 1 rep.",
              "foco": "Fluidez del complejo sin pausas innecesarias.",
              "series": [
                { "sets": 1, "reps": "3", "percentage": 55, "displayPercentage": "55%" },
                { "sets": 2, "reps": "2", "percentage": 60, "displayPercentage": "60%" }
              ]
            },
            {
              "name": "Snatch High Pull",
              "reference": "snatch",
              "percentage": 75,
              "displayPercentage": "75%",
              "reps": "3",
              "sets": 3,
              "rest": "2 min",
              "detail": "Tirón alto de arrancada técnico.",
              "foco": "Extensión vertical completa."
            },
            {
              "name": "Back Bulgarian Split Squats",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Bodyweight",
              "reps": "10 por pierna",
              "sets": 3,
              "rest": "60s",
              "detail": "Sentadilla búlgara trasera unilateral.",
              "foco": "Fuerza unilateral de cuádriceps y glúteo."
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios.",
              "foco": "Salud de espalda alta y manguito rotador."
            },
            {
              "name": "Landmine Barbell Row",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "10-12",
              "sets": 3,
              "rest": "60s",
              "detail": "Remo con barra landmine (remador T-bar).",
              "foco": "Tracción de espalda media."
            },
            {
              "name": "Band Pull Aparts",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "12",
              "sets": 3,
              "rest": "60s",
              "detail": "Aperturas horizontales con banda elástica.",
              "foco": "Salud de deltoides posterior y escápulas."
            }
          ]
        }
      ]
    }
  ]
};

// Exportar para uso en la app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultProgram };
} else {
  window.defaultProgram = defaultProgram;
}

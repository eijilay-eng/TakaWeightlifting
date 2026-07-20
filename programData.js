const defaultProgram = {
  name: "Taka Weightlifting",
  weeks: [
    {
      "id": "week_1",
      "name": "Semana 1",
      "focus": "Test de Fuerza (Back Squat y Front Squat), Complejos Técnicos y Base de Potencia",
      "days": [
        {
          "id": "day1",
          "name": "Día 1: Complejos de Cargada y Test de Sentadilla Trasera",
          "exercises": [
            {
              "name": "Deficit Muscle Squat Snatch",
              "reference": "snatch",
              "percentage": 60,
              "displayPercentage": "60%",
              "reps": "3",
              "sets": 3,
              "rest": "90s",
              "detail": "Arrancada de fuerza desde déficit recibida en sentadilla profunda. Pararse sobre discos o plataforma baja.",
              "foco": "Extensión explosiva de cadera y control en la recepción abajo."
            },
            {
              "name": "Clean + Front Squat + Push Jerk",
              "reference": "clean",
              "rest": "2 min",
              "detail": "1 Cargada completa + 1 Sentadilla Frontal + 1 Push Jerk por repetición. Calculado sobre tu 1RM de Clean & Jerk.",
              "foco": "Codos altos en la sentadilla y empuje vertical potente en el Jerk.",
              "series": [
                { "sets": 2, "reps": "3+3+3", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 2, "reps": "3+3+3", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "BTN Split Jerk",
              "reference": "clean",
              "percentage": 65,
              "displayPercentage": "65%",
              "reps": "4",
              "sets": 3,
              "rest": "2 min",
              "detail": "Envión en tijera desde detrás del cuello (Behind The Neck). Calculado sobre tu 1RM de Clean & Jerk.",
              "foco": "Dip vertical sin inclinar el tronco y tijera simétrica y estable."
            },
            {
              "name": "Back Squat (Test de 1RM)",
              "reference": "backSquat",
              "rest": "3 min",
              "detail": "Sesión de test. Subir progresivamente hasta el máximo del día con buena técnica. La última serie es AMRAP / Buscar 1RM.",
              "foco": "Rigidez del torso en cada serie y empuje concéntrico explosivo desde el fondo.",
              "series": [
                { "sets": 1, "reps": "2", "percentage": 80, "displayPercentage": "80%" },
                { "sets": 1, "reps": "1", "percentage": 85, "displayPercentage": "85%" },
                { "sets": 1, "reps": "1+", "percentage": 90, "displayPercentage": "90%+ (Buscar 1RM)" }
              ]
            }
          ]
        },
        {
          "id": "day2",
          "name": "Día 2: Técnica de Snatch y Complejos de Cargada",
          "exercises": [
            {
              "name": "Muscle Snatch + Sott Press",
              "reference": "snatch",
              "percentage": 40,
              "displayPercentage": "40%",
              "reps": "3+3",
              "sets": 3,
              "rest": "90s",
              "detail": "3 Muscle Snatches + 3 Sott Press (sentadilla overhead con agarre de arrancada) por serie.",
              "foco": "Posición de hombros activos arriba y estabilidad de columna en el Sott Press."
            },
            {
              "name": "Clean Lift Off + Squat Clean",
              "reference": "clean",
              "rest": "2 min",
              "detail": "1 Lift Off (despegue lento hasta la rodilla) + 1 Cargada completa = 1 rep. Foco en la primera parte del jalón.",
              "foco": "Mantener los hombros sobre la barra en el lift off antes de acelerar.",
              "series": [
                { "sets": 2, "reps": "3", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 3, "reps": "2", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "Thruster + Push Press",
              "reference": "clean",
              "rest": "90s",
              "detail": "1 Thruster (sentadilla frontal + press sobre cabeza en un movimiento) + 1 Push Press por repetición. Calculado sobre tu 1RM de Clean.",
              "foco": "Transferir la energía de las piernas directamente al empuje de brazos sin pausa.",
              "series": [
                { "sets": 2, "reps": "3+3", "percentage": 50, "displayPercentage": "50%" },
                { "sets": 2, "reps": "2+2", "percentage": 60, "displayPercentage": "60%" }
              ]
            },
            {
              "name": "Deficit Clean High Pull",
              "reference": "clean",
              "percentage": 70,
              "displayPercentage": "70%",
              "reps": "6",
              "sets": 3,
              "rest": "2 min",
              "detail": "Tirón alto de cargada desde posición de déficit (parado sobre discos). Mayor rango de movimiento en el despegue.",
              "foco": "Forzar la extensión de piernas y mantener la barra cerca del cuerpo en el tirón."
            }
          ]
        },
        {
          "id": "day3",
          "name": "Día 3: Potencia, Envión con Pausa y Test de Sentadilla Frontal",
          "exercises": [
            {
              "name": "Power Snatch + OHS",
              "reference": "snatch",
              "percentage": 60,
              "displayPercentage": "60%",
              "reps": "4 (1+1)",
              "sets": 3,
              "rest": "2 min",
              "detail": "1 Power Snatch + 1 Overhead Squat = 1 rep. Realizar 4 reps por serie.",
              "foco": "Recepción estable por encima de paralelo en el power snatch y control excéntrico en el OHS."
            },
            {
              "name": "Power Clean + Push Press",
              "reference": "clean",
              "rest": "2 min",
              "detail": "1 Power Clean + 1 Push Press = 1 rep. Calculado sobre tu 1RM de Clean & Jerk.",
              "foco": "Codos rápidos al frente en el clean y dip corto antes del empuje en el press.",
              "series": [
                { "sets": 2, "reps": "3 (1+1)", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 3, "reps": "3 (1+1)", "percentage": 70, "displayPercentage": "70%" }
              ]
            },
            {
              "name": "Split Jerk w/Pause in Receiving",
              "reference": "clean",
              "rest": "2 min",
              "detail": "Envión en tijera con pausa de 2-3 segundos en la posición de recepción (tijera) antes de recuperar.",
              "foco": "Estabilidad total en la tijera con el torso erguido y bloqueo firme de codos.",
              "series": [
                { "sets": 2, "reps": "3", "percentage": 65, "displayPercentage": "65%" },
                { "sets": 2, "reps": "2", "percentage": 70, "displayPercentage": "70%" }
              ]
            },
            {
              "name": "Front Squats (Test de 1RM)",
              "reference": "frontSquat",
              "rest": "3 min",
              "detail": "Sesión de test. Subir progresivamente hasta el máximo del día con buena técnica. La última serie busca 1RM.",
              "foco": "Codos muy altos, torso erguido y empuje continuo de piernas en cada repetición.",
              "series": [
                { "sets": 1, "reps": "2", "percentage": 80, "displayPercentage": "80%" },
                { "sets": 1, "reps": "1", "percentage": 85, "displayPercentage": "85%" },
                { "sets": 1, "reps": "1+", "percentage": 90, "displayPercentage": "90%+ (Buscar 1RM)" }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "week_2",
      "name": "Semana 2",
      "focus": "Intensidad Progresiva en Complejos, Fuerza en Sentadilla y Dominancia de Jerk",
      "days": [
        {
          "id": "day1",
          "name": "Día 1: Complejos de Cargada y Fuerza de Sentadilla",
          "exercises": [
            {
              "name": "Deficit Muscle Squat Snatch",
              "reference": "snatch",
              "percentage": 65,
              "displayPercentage": "65%",
              "reps": "3",
              "sets": 3,
              "rest": "90s",
              "detail": "Arrancada de fuerza desde déficit recibida en sentadilla profunda. Más carga que la semana anterior.",
              "foco": "Extensión máxima de cadera y entrada controlada al fondo de la sentadilla."
            },
            {
              "name": "Clean + Front Squat",
              "reference": "clean",
              "rest": "2 min",
              "detail": "1 Cargada completa + Sentadillas Frontales según la serie. Calculado sobre tu 1RM de Clean & Jerk.",
              "foco": "Codos altos en todas las sentadillas y postura firme al recibir la cargada.",
              "series": [
                { "sets": 2, "reps": "3+6", "percentage": 70, "displayPercentage": "70%" },
                { "sets": 3, "reps": "2+4", "percentage": 75, "displayPercentage": "75%" }
              ]
            },
            {
              "name": "BTN Split Jerk",
              "reference": "clean",
              "percentage": 70,
              "displayPercentage": "70%",
              "reps": "3",
              "sets": 3,
              "rest": "2 min",
              "detail": "Envión en tijera desde detrás del cuello (Behind The Neck). Mayor carga que la semana anterior.",
              "foco": "Empuje directo hacia arriba y tijera rápida y profunda para recibir la barra."
            },
            {
              "name": "Back Squat",
              "reference": "backSquat",
              "percentage": 80,
              "displayPercentage": "80%",
              "reps": "3",
              "sets": 4,
              "rest": "3 min",
              "detail": "Sentadilla trasera en volumen de fuerza. Profundidad completa en cada repetición.",
              "foco": "Mantener el pecho arriba y empuje explosivo desde el fondo en todas las series."
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios. Ejecutar con control y sin prisa al finalizar el trabajo principal.",
              "foco": "Calidad de movimiento sobre carga. Foco en el músculo objetivo."
            },
            {
              "name": "Tricep Extensions",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "8",
              "sets": 3,
              "rest": "60s",
              "detail": "Extensiones de tríceps en polea, mancuerna o banda. Codo fijo, solo se mueve el antebrazo.",
              "foco": "Extensión completa del codo y contracción máxima del tríceps en cada repetición."
            },
            {
              "name": "Suitcase March",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "10m por lado",
              "sets": 3,
              "rest": "60s",
              "detail": "Marcha portando una kettlebell o mancuerna a un lado del cuerpo (como una maleta). 10 metros por cada lado.",
              "foco": "Mantener la cadera nivelada, el tronco erguido y evitar inclinarse hacia el peso."
            }
          ]
        },
        {
          "id": "day2",
          "name": "Día 2: Técnica de Snatch y Complejos de Cargada Pesados",
          "exercises": [
            {
              "name": "Muscle Snatch + Sott Press",
              "reference": "snatch",
              "percentage": 40,
              "displayPercentage": "40%",
              "reps": "3+3",
              "sets": 3,
              "rest": "90s",
              "detail": "3 Muscle Snatches + 3 Sott Press (sentadilla overhead) por serie. Igual carga que semana anterior para dominio técnico.",
              "foco": "Postura erguida en el Sott Press y activación de hombros en el fondo de la sentadilla."
            },
            {
              "name": "Clean Lift Off + Squat Clean",
              "reference": "clean",
              "rest": "2 min",
              "detail": "1 Lift Off lento hasta rodilla + 1 Cargada completa = 1 rep. Mayor intensidad que semana 1.",
              "foco": "Hombros sobre la barra durante el lift off y aceleración potente en el segundo jalón.",
              "series": [
                { "sets": 2, "reps": "3", "percentage": 70, "displayPercentage": "70%" },
                { "sets": 1, "reps": "3", "percentage": 75, "displayPercentage": "75%" },
                { "sets": 2, "reps": "2", "percentage": 80, "displayPercentage": "80%" }
              ]
            },
            {
              "name": "Thruster + Push Jerk",
              "reference": "clean",
              "rest": "90s",
              "detail": "1 Thruster + 1 Push Jerk por repetición. El porcentaje es del Jerk (calculado sobre Clean & Jerk 1RM).",
              "foco": "Secuencia de empuje fluida del Thruster al Jerk sin perder la verticalidad.",
              "series": [
                { "sets": 1, "reps": "3+3", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 3, "reps": "2+2", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "Clean High Pull",
              "reference": "clean",
              "percentage": 85,
              "displayPercentage": "85%",
              "reps": "3",
              "sets": 4,
              "rest": "2 min",
              "detail": "Tirón alto de cargada a alta intensidad. Sin déficit esta semana, foco en la extensión y el jalón de codos.",
              "foco": "Extensión completa del cuerpo antes de jalar los codos hacia arriba y afuera."
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios. Ejecutar con control y sin prisa al finalizar el trabajo principal.",
              "foco": "Calidad de movimiento sobre carga. Foco en el músculo objetivo."
            },
            {
              "name": "Pull Ups",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "5",
              "sets": 4,
              "rest": "90s",
              "detail": "Dominadas con agarre pronado (palmas al frente). Rango completo: colgado muerto hasta barbilla sobre la barra.",
              "foco": "Activar los dorsales antes de jalar y bajar lentamente controlando el excéntrico."
            },
            {
              "name": "YTW en Banco",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "6",
              "sets": 3,
              "rest": "60s",
              "detail": "Tumbado boca abajo en banco inclinado, mancuernas ligeras. Realizar las tres posiciones: Y (brazos arriba diagonal), T (brazos al costado), W (codos doblados hacia atrás).",
              "foco": "Retraer y deprimir las escápulas en cada posición para activar el manguito rotador."
            }
          ]
        },
        {
          "id": "day3",
          "name": "Día 3: Potencia, Bloques y Jerk con Pausa",
          "exercises": [
            {
              "name": "Power Snatch + OHS",
              "reference": "snatch",
              "percentage": 70,
              "displayPercentage": "70%",
              "reps": "3 (1+1)",
              "sets": 3,
              "rest": "2 min",
              "detail": "1 Power Snatch + 1 Overhead Squat = 1 rep. Mayor carga que semana anterior.",
              "foco": "Recepción alta y estable, luego control total en el descenso del OHS."
            },
            {
              "name": "Power Clean from Blocks",
              "reference": "clean",
              "rest": "2 min",
              "detail": "Cargada de potencia desde bloques (barra a nivel de rodilla o encima). Elimina el primer jalón para enfocarse en la explosión final.",
              "foco": "Aceleración máxima desde los bloques y codos veloces al frente al recibir.",
              "series": [
                { "sets": 2, "reps": "3", "percentage": 70, "displayPercentage": "70%" },
                { "sets": 3, "reps": "3", "percentage": 75, "displayPercentage": "75%" }
              ]
            },
            {
              "name": "Split Jerk w/Pause in Receiving (2\")",
              "reference": "clean",
              "rest": "2 min",
              "detail": "Envión en tijera con pausa específica de 2 segundos en la posición de recepción antes de recuperar. Mayor carga que semana 1.",
              "foco": "Bloqueo de codos y estabilidad de hombros durante los 2 segundos de pausa en la tijera.",
              "series": [
                { "sets": 2, "reps": "3", "percentage": 70, "displayPercentage": "70%" },
                { "sets": 2, "reps": "2", "percentage": 75, "displayPercentage": "75%" }
              ]
            },
            {
              "name": "Front Squats",
              "reference": "frontSquat",
              "percentage": 80,
              "displayPercentage": "80%",
              "reps": "2",
              "sets": 4,
              "rest": "3 min",
              "detail": "Sentadilla frontal en volumen de fuerza. Profundidad completa con codos altos en todas las repeticiones.",
              "foco": "Mantener los codos muy arriba y el torso erguido para proteger la columna lumbar."
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios. Ejecutar con control y sin prisa al finalizar el trabajo principal.",
              "foco": "Calidad de movimiento sobre carga. Foco en el músculo objetivo."
            },
            {
              "name": "Bulgarian Split Deadlifts",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "10",
              "sets": 3,
              "rest": "60s",
              "detail": "Peso muerto con pie trasero elevado en banco (posición búlgara). Mancuernas o kettlebells en cada mano. Un lado a la vez.",
              "foco": "Mantener la espalda recta y el peso sobre el talón del pie delantero durante toda la bajada."
            },
            {
              "name": "Deficit Sumo Squats",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "10",
              "sets": 3,
              "rest": "60s",
              "detail": "Sentadilla sumo desde posición elevada (parado sobre discos o cajón). Pies en postura amplia, puntas hacia afuera. Mayor rango de movimiento en la cadera.",
              "foco": "Rodillas en línea con los pies y activación de glúteos e isquiotibiales al subir."
            }
          ]
        }
      ]
    },
    {
      "id": "week_3",
      "name": "Semana 3",
      "focus": "Fase de Realización: Sencillos y Dobles Pesados (85-90%), Pico de Intensidad y Máxima Calidad Técnica",
      "days": [
        {
          "id": "day1",
          "name": "Día 1: Complejo de Cargada Pesado y Fuerza de Sentadilla",
          "exercises": [
            {
              "name": "Muscle Squat Snatch",
              "reference": "snatch",
              "percentage": 70,
              "displayPercentage": "70%",
              "reps": "2",
              "sets": 3,
              "rest": "90s",
              "detail": "Arrancada de fuerza recibida en sentadilla profunda. Activación técnica y precisión en el despegue.",
              "foco": "Extensión completa de cadera y velocidad para entrar al fondo de la sentadilla."
            },
            {
              "name": "Clean + Front Squat",
              "reference": "clean",
              "rest": "2.5 min",
              "detail": "1 Cargada completa + Sentadillas Frontales según la serie. Complejo corto de alta intensidad.",
              "foco": "Codos altos en la recepción y velocidad de subida en la sentadilla.",
              "series": [
                { "sets": 2, "reps": "1+2", "percentage": 80, "displayPercentage": "80%" },
                { "sets": 2, "reps": "1+1", "percentage": 85, "displayPercentage": "85%" }
              ]
            },
            {
              "name": "BTN Split Jerk",
              "reference": "clean",
              "rest": "2.5 min",
              "detail": "Envión en tijera desde detrás del cuello (Behind The Neck). Sencillos y dobles pesados.",
              "foco": "Dip vertical controlado y fijación instantánea en la tijera.",
              "series": [
                { "sets": 3, "reps": "2", "percentage": 80, "displayPercentage": "80%" },
                { "sets": 2, "reps": "1", "percentage": 85, "displayPercentage": "85%" }
              ]
            },
            {
              "name": "Back Squat",
              "reference": "backSquat",
              "rest": "3 min",
              "detail": "Sentadilla trasera en fase de realización. Carga pesada con volumen reducido para no fatigarte.",
              "foco": "Tensión máxima en el torso y explosividad en el punto de estancamiento.",
              "series": [
                { "sets": 1, "reps": "3", "percentage": 85, "displayPercentage": "85%" },
                { "sets": 2, "reps": "2", "percentage": 90, "displayPercentage": "90%" }
              ]
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios. Ejecutar con control al finalizar el trabajo principal.",
              "foco": "Calidad de movimiento y recuperación."
            },
            {
              "name": "Tricep Extensions",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "8",
              "sets": 3,
              "rest": "60s",
              "detail": "Extensiones de tríceps en polea o mancuerna. Codo fijo, solo se mueve el antebrazo.",
              "foco": "Extensión completa del codo y contracción máxima del tríceps."
            },
            {
              "name": "Suitcase March",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "10m por lado",
              "sets": 3,
              "rest": "60s",
              "detail": "Marcha portando pesas a un lado del cuerpo.",
              "foco": "Mantener la cadera nivelada y el tronco erguido."
            }
          ]
        },
        {
          "id": "day2",
          "name": "Día 2: Pico de Cargada (Clean al 90%) y Sobrecarga de Jerk",
          "exercises": [
            {
              "name": "Clean Grip Power Snatch",
              "reference": "snatch",
              "percentage": 55,
              "displayPercentage": "55%",
              "reps": "3",
              "sets": 3,
              "rest": "90s",
              "detail": "Arrancada de potencia con agarre de cargada. Peso ligero para activación neuromuscular y velocidad.",
              "foco": "Trayectoria pegada al cuerpo y velocidad de entrada."
            },
            {
              "name": "Clean (Cargada Completa)",
              "reference": "clean",
              "rest": "3 min",
              "detail": "Cargada completa de sentadilla. Progresión en sencillos y dobles hasta el 90%.",
              "foco": "Segundo tirón agresivo y codos veloces para una recepción limpia.",
              "series": [
                { "sets": 2, "reps": "2", "percentage": 80, "displayPercentage": "80%" },
                { "sets": 1, "reps": "2", "percentage": 85, "displayPercentage": "85%" },
                { "sets": 2, "reps": "1", "percentage": 90, "displayPercentage": "90%" }
              ]
            },
            {
              "name": "Jerk Dip n' Drive",
              "reference": "clean",
              "percentage": 95,
              "displayPercentage": "95%",
              "reps": "3",
              "sets": 3,
              "rest": "2 min",
              "detail": "Flexión y extensión explosiva de Jerk en el rack sin soltar la barra. Sobrecarga pesada para el SNC.",
              "foco": "Dip vertical sin inclinar el torso y extensión potente de piernas."
            },
            {
              "name": "Clean High Pull",
              "reference": "clean",
              "rest": "2.5 min",
              "detail": "Tirón alto de cargada a muy alta intensidad. Mantiene la fuerza de extensión.",
              "foco": "Hombros sobre la barra y tirón alto de codos.",
              "series": [
                { "sets": 2, "reps": "3", "percentage": 90, "displayPercentage": "90%" },
                { "sets": 2, "reps": "2", "percentage": 95, "displayPercentage": "95%" }
              ]
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios. Ejecutar con control.",
              "foco": "Refuerzo escapular y cadena posterior."
            },
            {
              "name": "Pull Ups",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "5",
              "sets": 3,
              "rest": "90s",
              "detail": "Dominadas estrictas con agarre pronado.",
              "foco": "Activar los dorsales y bajar con control."
            },
            {
              "name": "YTW en Banco",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "6",
              "sets": 3,
              "rest": "60s",
              "detail": "Trabajo de estabilidad para escápulas en banco inclinado.",
              "foco": "Retraer y deprimir las escápulas en cada posición."
            }
          ]
        },
        {
          "id": "day3",
          "name": "Día 3: Día Máximo — Snatch y Clean & Jerk al 90%",
          "exercises": [
            {
              "name": "Snatch (Arrancada Completa)",
              "reference": "snatch",
              "rest": "3 min",
              "detail": "Arrancada completa. Subida progresiva a sencillos pesados al 90%.",
              "foco": "Confianza bajo la barra y bloqueo firme en la recepción.",
              "series": [
                { "sets": 1, "reps": "3", "percentage": 80, "displayPercentage": "80%" },
                { "sets": 2, "reps": "2", "percentage": 85, "displayPercentage": "85%" },
                { "sets": 2, "reps": "1", "percentage": 90, "displayPercentage": "90%" }
              ]
            },
            {
              "name": "Clean & Jerk (Levantamiento Olímpico Completo)",
              "reference": "clean",
              "rest": "3 min",
              "detail": "1 Cargada + 1 Envión completo. Máximo esfuerzo técnico del mesociclo.",
              "foco": "Transición limpia entre la cargada y el envión, manteniendo concentración total en el Jerk.",
              "series": [
                { "sets": 1, "reps": "2", "percentage": 80, "displayPercentage": "80%" },
                { "sets": 2, "reps": "2", "percentage": 85, "displayPercentage": "85%" },
                { "sets": 2, "reps": "1", "percentage": 90, "displayPercentage": "90%" }
              ]
            },
            {
              "name": "Snatch High Pull",
              "reference": "snatch",
              "percentage": 95,
              "displayPercentage": "95%",
              "reps": "3",
              "sets": 3,
              "rest": "2 min",
              "detail": "Tirón alto de arrancada con sobrecarga.",
              "foco": "Extensión vertical completa de cadera y tobillos."
            },
            {
              "name": "Front Squat",
              "reference": "frontSquat",
              "rest": "3 min",
              "detail": "Sentadilla frontal pesada de cierre. Mantener la postura limpia.",
              "foco": "Codos muy altos y torso vertical.",
              "series": [
                { "sets": 1, "reps": "2", "percentage": 85, "displayPercentage": "85%" },
                { "sets": 2, "reps": "1", "percentage": 90, "displayPercentage": "90%" }
              ]
            },
            {
              "name": "— ACCESORIOS —",
              "reference": null,
              "percentage": null,
              "displayPercentage": "—",
              "reps": "—",
              "sets": "—",
              "rest": "60s",
              "detail": "Sección de accesorios. Ejecutar con control.",
              "foco": "Recuperación e isquiotibiales."
            },
            {
              "name": "Bulgarian Split Deadlifts",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "10",
              "sets": 3,
              "rest": "60s",
              "detail": "Peso muerto unilateral con pie elevado.",
              "foco": "Estabilidad y fuerza unilateral."
            },
            {
              "name": "Deficit Sumo Squats",
              "reference": null,
              "percentage": null,
              "displayPercentage": "Accesorio",
              "reps": "10",
              "sets": 3,
              "rest": "60s",
              "detail": "Sentadilla sumo en déficit desde plataformas.",
              "foco": "Aductores y glúteos."
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

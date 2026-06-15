const defaultProgram = {
  name: "Taka Weightlifting - Junio",
  weeks: [
    {
      "id": "week_new_1",
      "name": "Semana 1",
      "focus": "Muscle Snatch, Snatch Balance y Fuerza Básica (Ciclo 3 / Semana 1)",
      "days": [
        {
          "id": "day1",
          "name": "Día 1: Muscle Snatch e Intensidad de Sentadilla",
          "exercises": [
            {
              "name": "Muscle Snatch + Press",
              "reference": "snatch",
              "percentage": 50,
              "displayPercentage": "50%",
              "reps": "4 + 4",
              "sets": 3,
              "rest": "90s",
              "detail": "4 Snatches de fuerza + 4 Empujes de fuerza tras la nuca (con agarre de snatch) por serie.",
              "foco": "Extensión fluida de brazos en el snatch y empuje continuo en el press."
            },
            {
              "name": "3 Stops Snatch",
              "reference": "snatch",
              "rest": "2 min",
              "detail": "Realizar Snatch con 3 pausas durante el jalón (salida, rodilla y cadera).",
              "foco": "Mantener las posturas rígidas y el equilibrio en cada una de las 3 pausas.",
              "series": [
                { "sets": 2, "reps": "4", "percentage": 50, "displayPercentage": "50%" },
                { "sets": 2, "reps": "3", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 2, "reps": "3", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "Deficit Squat Clean + Push Press",
              "reference": "clean",
              "percentage": 60,
              "displayPercentage": "60%",
              "reps": "4",
              "sets": 3,
              "rest": "2 min",
              "detail": "1 Cargada desde déficit (sentadilla profunda) + 1 Push Press por repetición. Calculado en base a tu 1RM de Clean & Jerk.",
              "foco": "Salida limpia desde el déficit y empuje vertical del torso."
            },
            {
              "name": "Back Squat (Ciclo 3 / Semana 1)",
              "reference": "backSquat",
              "rest": "3 min",
              "detail": "Calcular los porcentajes sobre el 90% de tu 1RM + 20 lbs (9 kg). La última serie es AMRAP (repeticiones máximas posibles con buena técnica).",
              "foco": "Mantener la estabilidad lumbar en la serie AMRAP pesada.",
              "series": [
                { "sets": 1, "reps": "5", "percentage": null, "displayPercentage": "65% (*)" },
                { "sets": 1, "reps": "5", "percentage": null, "displayPercentage": "75% (*)" },
                { "sets": 1, "reps": "5+", "percentage": null, "displayPercentage": "85%+ (*)" }
              ]
            }
          ]
        },
        {
          "id": "day2",
          "name": "Día 2: Snatch Técnico y BTN Push Press",
          "exercises": [
            {
              "name": "Snatch Balance + OHS",
              "reference": "snatch",
              "percentage": 55,
              "displayPercentage": "50-60%",
              "reps": "4 + 4",
              "sets": 3,
              "rest": "90s",
              "detail": "4 Snatches Balance + 4 Sentadillas de arrancada (Overhead Squat) por serie.",
              "foco": "Velocidad de pies y bloqueo instantáneo de hombros."
            },
            {
              "name": "Deficit Snatch High Pull + Hang Snatch",
              "reference": "snatch",
              "rest": "2 min",
              "detail": "Realizado parado sobre déficit (disco o plataforma).",
              "foco": "Forzar la flexión y empuje de piernas debido al déficit.",
              "series": [
                { "sets": 2, "reps": "4 + 2", "percentage": 50, "displayPercentage": "50%" },
                { "sets": 2, "reps": "3 + 2", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 2, "reps": "3 + 1", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "Power Clean + Jerk",
              "reference": "clean",
              "percentage": 65,
              "displayPercentage": "65%",
              "reps": "4",
              "sets": 3,
              "rest": "2 min",
              "detail": "1 Cargada de potencia + 1 Envión clásico por repetición.",
              "foco": "Bloqueo firme de codos y recuperación estable en el Jerk."
            },
            {
              "name": "BTN Push Press",
              "reference": "clean",
              "percentage": 60,
              "displayPercentage": "60%",
              "reps": "5",
              "sets": 3,
              "rest": "90s",
              "detail": "Push Press detrás de la cabeza (Behind The Neck). Usa tu 1RM de Clean como referencia para el cálculo.",
              "foco": "Flexión (dip) vertical y empuje explosivo sin inclinar el pecho."
            }
          ]
        },
        {
          "id": "day3",
          "name": "Día 3: Pausas en Snatch y Sentadilla Frontal",
          "exercises": [
            {
              "name": "Muscle Squat Snatch + Snatch Balance",
              "reference": "snatch",
              "rest": "90s",
              "detail": "Cargada de arrancada de fuerza recibida en sentadilla profunda + Snatch Balance.",
              "foco": "Velocidad terminal de entrada bajo la barra.",
              "series": [
                { "sets": 2, "reps": "3 + 3", "percentage": 55, "displayPercentage": "55%" },
                { "sets": 2, "reps": "2 + 2", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "Snatch w/3\" Pause Above Knee",
              "reference": "snatch",
              "rest": "2 min",
              "detail": "Realizar arrancada completa pausando 3 segundos justo encima de las rodillas antes de la extensión.",
              "foco": "Mantener hombros por delante de la barra en la pausa de 3 segundos.",
              "series": [
                { "sets": 3, "reps": "3", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 2, "reps": "2", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "Clean High Pull + Power Clean",
              "reference": "clean",
              "rest": "2 min",
              "detail": "Tirones altos de cargada + cargadas de potencia.",
              "foco": "Conectar el tirón explosivo de brazos con la cargada.",
              "series": [
                { "sets": 3, "reps": "4 + 2", "percentage": 60, "displayPercentage": "60%" },
                { "sets": 2, "reps": "3 + 2", "percentage": 65, "displayPercentage": "65%" }
              ]
            },
            {
              "name": "Front Squats (Ciclo 3 / Semana 1)",
              "reference": "frontSquat",
              "rest": "3 min",
              "detail": "Calcular los porcentajes sobre el 90% de tu 1RM + 20 lbs (9 kg).",
              "foco": "Mantener codos altos y torso erguido en el squat pesado.",
              "series": [
                { "sets": 1, "reps": "5", "percentage": null, "displayPercentage": "65% (*)" },
                { "sets": 1, "reps": "5", "percentage": null, "displayPercentage": "75% (*)" },
                { "sets": 1, "reps": "5", "percentage": null, "displayPercentage": "85% (*)" }
              ]
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

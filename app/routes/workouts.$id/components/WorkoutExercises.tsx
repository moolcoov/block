const sections = [
  {
    id: 1,
    title: "РАЗМИНКА",
    exercises: [
      {
        id: 1,
        title: "Приседания",
        type: "countable",
        defaultWeight: "bodyWeight",
        sets: [
          {
            id: 1,
            reps: 10,
            weight: "bodyWeight",
          },
          {
            id: 2,
            reps: 5,
            weight: "bodyWeight",
          },
        ],
      },
      {
        id: 2,
        title: "Отжимания",
        type: "countable",
        defaultWeight: "bodyWeight",
        sets: [
          {
            id: 1,
            reps: 10,
            weight: "bodyWeight",
          },
        ],
      },
    ],
  },
];

interface Exercise {
  id: number;
  title: string;
  type: string;
  defaultWeight: string;
  sets: {
    id: number;
    reps: number;
    weight: string;
  }[];
}

export const WorkoutExercises = () => {
  return (
    <div className="mt-10 px-4">
      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-6">
          <h2 className="text-2xl font-black">{section.title}</h2>
          <div className="flex flex-col gap-5">
            {section.exercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className="flex h-[60px] items-center gap-5">
      <div className="aspect-square h-full rounded-2xl bg-amber-100"></div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base">
          {exercise.sets.length > 1 && (
            <span className="mr-1.5 font-black">{exercise.sets.length}x</span>
          )}
          <span className="font-bold">{exercise.title}</span>
        </h3>
        <p className="text-muted-foreground text-sm font-medium">
          Повторений: {exercise.sets.map((set) => set.reps).join(", ")}
        </p>
      </div>
    </div>
  );
};

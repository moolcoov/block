import React from "react";
import type {
  Exercise,
  ExerciseFilters,
} from "~/features/workout/types/exercises";

interface ExercisesContextType {
  exercises: Exercise[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: ExerciseFilters;
  setFilters: (filters: ExerciseFilters) => void;
}

const ExercisesContext = React.createContext<ExercisesContextType | undefined>(
  undefined,
);

interface ExercisesProviderProps {
  exercises: Exercise[];
  children: React.ReactNode;
}

export const ExercisesProvider = ({
  exercises,
  children,
}: ExercisesProviderProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<ExerciseFilters>({});

  return (
    <ExercisesContext.Provider
      value={{ exercises, searchQuery, setSearchQuery, filters, setFilters }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export const useExercises = () => {
  const context = React.useContext(ExercisesContext);
  if (context === undefined) {
    throw new Error("useExercises must be used within a ExercisesProvider");
  }
  return context.exercises;
};

export const useExercisesSearchQuery = () => {
  const context = React.useContext(ExercisesContext);
  if (context === undefined) {
    throw new Error("useSearchQuery must be used within a ExercisesProvider");
  }
  return [context.searchQuery, context.setSearchQuery];
};

export const useExercisesFilters = () => {
  const context = React.useContext(ExercisesContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a ExercisesProvider");
  }
  return [context.filters, context.setFilters];
};

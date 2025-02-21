import { deleteAllExercisesFromDB } from "~/features/exercise/model/db";
import { deleteAllMediaFromDB } from "~/features/media/model/db";
import { deleteAllSessionsFromDB } from "~/features/session/model/db";
import { deleteTags } from "~/features/tag/model/storage";
import { deleteUser } from "~/features/user/model/storage";
import { deleteAllWorkoutsFromDB } from "~/features/workout/model/db";

export const deleteEverything = async () => {
  try {
    deleteUser();
    deleteTags();

    await deleteAllExercisesFromDB();
    await deleteAllWorkoutsFromDB();
    await deleteAllSessionsFromDB();
    await deleteAllMediaFromDB();
  } catch (e) {
    console.error(e);
  }
};

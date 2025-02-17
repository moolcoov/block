import React from "react";
import { cn } from "~/shared/lib/utils";
import { Button } from "~/shared/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "~/shared/ui/Drawer";
import {
  CameraIcon,
  DumbBellIcon,
  PhotoIcon,
  XmarkIcon,
} from "~/shared/ui/icons";
import { ExerciseType, type Exercise } from "../model/types";
import { MediaUploader } from "~/features/media/ui/MediaUploader";
import { Checkbox } from "~/shared/ui/Checkbox";
import type { UUID } from "~/shared/types/uuid";
import { ControlButtons } from "~/shared/ui/ControlButtons";
import { CreateModal, type CreateScreen } from "~/shared/ui/CreateModal";
import { useExercisesStore } from "../model/store";
import { v4 as uuidv4 } from "uuid";
import { Difficulty } from "~/shared/types/difficulty";
import { addMediaToDB } from "~/features/media/model/db";
import { getDifficultyIcon, getDifficultyLabel } from "~/shared/lib/difficulty";

interface CreateExerciseObject {
  title?: string;
  type?: ExerciseType;
  difficulty?: Difficulty;
  equipment?: UUID[];
  tags?: UUID[];

  image?: Blob;
  video?: Blob;
}

interface CreateExerciseContextType {
  exerciseObject: CreateExerciseObject;
  setExerciseObject: React.Dispatch<React.SetStateAction<CreateExerciseObject>>;
}

const CreateExerciseContext = React.createContext<
  CreateExerciseContextType | undefined
>(undefined);

export const ExerciseCreateModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  const addExercise = useExercisesStore((state) => state.addExercise);
  const [exerciseObject, setExerciseObject] =
    React.useState<CreateExerciseObject>({});

  const finish = React.useCallback(async () => {
    const exercise: Exercise = {
      id: uuidv4(),
      title: exerciseObject.title || "Без названия",
      type: exerciseObject.type || ExerciseType.QUANTITY,
      difficulty: exerciseObject.difficulty || Difficulty.MEDIUM,
      createdAt: new Date(),
      editedAt: new Date(),
    };

    if (exerciseObject.image) {
      const id = uuidv4();

      await addMediaToDB({
        type: "photo",
        data: exerciseObject.image,
        id: id,
        size: exerciseObject.image.size,
      });

      exercise.image = {
        type: "stored",
        storedId: id,
      };
    }

    if (exerciseObject.video) {
      const id = uuidv4();

      await addMediaToDB({
        type: "video",
        data: exerciseObject.video,
        id: id,
        size: exerciseObject.video.size,
      });

      exercise.video = {
        type: "stored",
        storedId: id,
      };
    }

    await addExercise(exercise);
    setOpen(false);
  }, [exerciseObject, addExercise]);

  return (
    <Drawer shouldScaleBackground={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[85vh] overflow-hidden">
        <DrawerClose asChild>
          <Button
            variant={"secondary"}
            size={"icon"}
            className="fixed top-5 left-5 z-40"
          >
            <XmarkIcon size={19} />
          </Button>
        </DrawerClose>
        <CreateExerciseContext.Provider
          value={{
            exerciseObject,
            setExerciseObject,
          }}
        >
          <CreateModal
            screens={[
              TitleScreen,
              PhotoScreen,
              VideoScreen,
              DifficultyScreen,
              EquipmentScreen,
              TagsScreen,
            ]}
            onFinish={finish}
          />
        </CreateExerciseContext.Provider>
      </DrawerContent>
    </Drawer>
  );
};

const useCreateExercise = () => {
  const context = React.useContext(CreateExerciseContext);
  if (context === undefined) {
    throw new Error(
      "useCreateExercise must be used within a CreateExerciseProvider",
    );
  }
  return context;
};

const TitleScreen: CreateScreen = ({ next, prev }) => {
  const { setExerciseObject } = useCreateExercise();
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState<ExerciseType | undefined>();

  const onInput = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(e.target.value.replace("\n", ""));
    },
    [setTitle],
  );

  const onSubmit = React.useCallback(async () => {
    setExerciseObject((prev) => ({ ...prev, title, type }));
    await next();
  }, [next, title, type]);

  return (
    <div className="flex h-full flex-col gap-4 px-5 pb-(--bottom-button)">
      <div className="flex flex-1 flex-col items-center overflow-y-auto">
        <div className="flex w-full flex-1 justify-center">
          <textarea
            className="w-full content-center py-16 text-center text-3xl font-black text-balance outline-none"
            placeholder="ВВЕДИТЕ НАЗВАНИЕ УПРАЖНЕНИЯ"
            onChange={onInput}
            value={title}
          />
        </div>
        <div className="flex w-full gap-4">
          <TypeButton
            icon={<DumbBellIcon size={34} />}
            label="На количество"
            onClick={() => {
              setType(ExerciseType.QUANTITY);
            }}
            active={type === ExerciseType.QUANTITY}
          />
          <TypeButton
            icon={<DumbBellIcon size={34} />}
            label="На время"
            onClick={() => {
              setType(ExerciseType.TIMED);
            }}
            active={type === ExerciseType.TIMED}
          />
        </div>
      </div>
      <ControlButtons
        onNext={onSubmit}
        label="ДАЛЕЕ"
        disabled={title === "" || !type}
      />
    </div>
  );
};

const PhotoScreen: CreateScreen = ({ next, prev }) => {
  const { setExerciseObject } = useCreateExercise();
  const [file, setFile] = React.useState<Blob>();

  const onSubmit = React.useCallback(async () => {
    setExerciseObject((prev) => ({ ...prev, image: file }));
    await next();
  }, [file, next]);

  return (
    <div className="flex h-full flex-col gap-4 px-5 pt-20 pb-(--bottom-button)">
      <div className="flex flex-1 flex-col items-start gap-8 overflow-y-auto">
        <h1 className="text-3xl font-black">ДОБАВЬТЕ ФОТО</h1>
        <MediaUploader
          icon={<PhotoIcon size={40} />}
          title="Фото упражнения"
          subtitle="Лучше всего подходят квадратные фото"
          limitLabel="5 МБ"
          limit={1024 * 1024 * 5}
          type="photo"
          hook={setFile}
        />
      </div>
      <ControlButtons onNext={onSubmit} label="ДАЛЕЕ" disabled={!file} />
    </div>
  );
};

const VideoScreen: CreateScreen = ({ next, prev }) => {
  const { setExerciseObject } = useCreateExercise();
  const [file, setFile] = React.useState<Blob>();

  const onSubmit = React.useCallback(async () => {
    setExerciseObject((prev) => ({ ...prev, video: file }));
    await next();
  }, [file, next]);

  return (
    <div className="flex h-full flex-col gap-4 px-5 pt-20 pb-(--bottom-button)">
      <div className="flex flex-1 flex-col items-start gap-8 overflow-y-auto">
        <h1 className="text-3xl font-black">ДОБАВЬТЕ ФОТО</h1>
        <MediaUploader
          icon={<CameraIcon size={40} />}
          title="Видео с упражнением"
          subtitle="Лучше всего подходят вертикальные клипы до 5 секунд"
          limitLabel="20 МБ"
          limit={1024 * 1024 * 100020}
          type="video"
          aspectRatio="6/7"
          hook={setFile}
        />
      </div>

      <ControlButtons onNext={onSubmit} label="ДАЛЕЕ" disabled={!file} />
    </div>
  );
};

const DifficultyScreen: CreateScreen = ({ next, prev }) => {
  const { setExerciseObject } = useCreateExercise();
  const [difficulty, setDifficulty] = React.useState<Difficulty>();

  const onSubmit = React.useCallback(async () => {
    setExerciseObject((prev) => ({ ...prev, difficulty }));
    await next();
  }, [difficulty, next]);

  return (
    <div className="flex h-full flex-col gap-4 px-5 pb-(--bottom-button)">
      <div className="flex flex-1 flex-col gap-8 overflow-y-scroll pt-20">
        <h1 className="text-3xl font-black text-balance">УКАЖИТЕ СЛОЖНОСТЬ</h1>

        <div className="flex flex-col gap-1.5">
          {Object.values(Difficulty).map((d) => {
            const Icon = getDifficultyIcon(d);

            return (
              <Checkbox
                icon={<Icon size={18} />}
                key={d}
                label={getDifficultyLabel(d)}
                checked={difficulty === d}
                onChange={() => setDifficulty(d)}
              />
            );
          })}
        </div>
      </div>
      <ControlButtons onNext={onSubmit} label="ДАЛЕЕ" disabled={!difficulty} />
    </div>
  );
};

const equipments = [
  { id: "1", label: "Брусья" },
  { id: "2", label: "Бутерброд" },
  { id: "3", label: "Велосипед" },
  { id: "4", label: "Велотрековая баска" },
  { id: "5", label: "Гимнастический коврик" },
  { id: "6", label: "Гиря" },
  { id: "7", label: "Губка" },
  { id: "7", label: "Губка" },
  { id: "7", label: "Губка" },
  { id: "7", label: "Губка" },
  { id: "7", label: "Губка" },
  { id: "7", label: "Губка" },
];

const EquipmentScreen: CreateScreen = ({ next, prev }) => {
  const { setExerciseObject } = useCreateExercise();
  const [equipment, setEquipment] = React.useState<UUID[]>([]);

  const addEquipment = React.useCallback((equipment: UUID) => {
    return () => {
      setEquipment((prev) => [...prev, equipment]);
    };
  }, []);

  const removeEquipment = React.useCallback((equipment: UUID) => {
    return () => {
      setEquipment((prev) => prev.filter((e) => e !== equipment));
    };
  }, []);

  const onSubmit = React.useCallback(async () => {
    setExerciseObject((prev) => ({ ...prev, equipment }));
    await next();
  }, [equipment, next]);

  return (
    <div className="flex h-full flex-col gap-4 px-5 pb-(--bottom-button)">
      <div className="flex flex-1 flex-col gap-8 overflow-y-scroll pt-20">
        <h1 className="text-3xl font-black text-balance">
          ВЫБЕРИТЕ ОБОРУДОВАНИЕ
        </h1>

        <div className="flex flex-col gap-1.5">
          {equipments.map((e) => {
            const active = equipment?.includes(e.id);

            return (
              <Checkbox
                key={e.id}
                label={e.label}
                checked={active}
                onChange={active ? removeEquipment(e.id) : addEquipment(e.id)}
              />
            );
          })}
        </div>
      </div>
      <ControlButtons
        onNext={onSubmit}
        label="ДАЛЕЕ"
        disabled={!(equipment.length > 0)}
      />
    </div>
  );
};

const tagsDef = [
  { id: "1", label: "Штанга" },
  { id: "2", label: "Бокс" },
  { id: "3", label: "Брусья" },
  { id: "4", label: "Бутерброд" },
];

const TagsScreen: CreateScreen = ({ next, prev }) => {
  const { setExerciseObject } = useCreateExercise();
  const [tags, setTags] = React.useState<UUID[]>([]);

  const addTag = React.useCallback((tag: UUID) => {
    return () => {
      setTags((prev) => [...prev, tag]);
    };
  }, []);

  const removeTag = React.useCallback((tag: UUID) => {
    return () => {
      setTags((prev) => prev.filter((t) => t !== tag));
    };
  }, []);

  const onSubmit = React.useCallback(async () => {
    setExerciseObject((prev) => ({ ...prev, tags }));
    await next();
  }, [tags, next]);

  return (
    <div className="flex h-full flex-col gap-4 px-5 pb-(--bottom-button)">
      <div className="flex flex-1 flex-col gap-8 overflow-y-scroll pt-20">
        <h1 className="text-3xl font-black text-balance">ДОБАВЬТЕ ТЕГИ</h1>

        <div className="flex flex-wrap gap-3">
          {tagsDef.map((t) => {
            const active = tags?.includes(t.id);

            return (
              <button
                key={t.id}
                className={cn(
                  "bg-muted rounded-xl px-[18px] py-3 text-sm font-medium",
                  {
                    "bg-accent text-background-200": active,
                  },
                )}
                onClick={active ? removeTag(t.id) : addTag(t.id)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      <ControlButtons onNext={onSubmit} label="СОХРАНИТЬ" />
    </div>
  );
};

const TypeButton = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(
        "bg-muted text-muted-foreground flex flex-1 flex-col gap-2 rounded-2xl px-3.5 py-3 transition-transform active:scale-[0.95]",
        {
          "text-background-200 bg-white": active,
        },
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-left font-medium">{label}</span>
    </button>
  );
};

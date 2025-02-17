export type EquipmentType = string;

interface Equipment {
  type: EquipmentType;
  name: string;
  weights: boolean;
}

const equipment: Equipment[] = [
  {
    type: "body_weight",
    name: "Собственный вес",
    weights: true,
  },
  {
    type: "assault_bike",
    name: "Велотренажер",
    weights: false,
  },
  {
    type: "barbell",
    name: "Штанга",
    weights: true,
  },
  {
    type: "battle_rope",
    name: "Канат для фитнеса",
    weights: false,
  },
  {
    type: "bench",
    name: "Скамья",
    weights: false,
  },
  {
    type: "dip_bar",
    name: "Брусья",
    weights: true,
  },
  {
    type: "dumbbell",
    name: "Гантель",
    weights: true,
  },
  {
    type: "jump_rope",
    name: "Скакалка",
    weights: false,
  },
  {
    type: "kettlebell",
    name: "Гиря",
    weights: true,
  },
  {
    type: "machines",
    name: "Тренажеры",
    weights: true,
  },
  {
    type: "medicine_ball",
    name: "Медицинский мяч",
    weights: false,
  },
  {
    type: "plyo_box",
    name: "Плиобокс",
    weights: false,
  },
  {
    type: "pull_up_bar",
    name: "Турник",
    weights: true,
  },
  {
    type: "resistance_band",
    name: "Эспандер",
    weights: false,
  },
  {
    type: "rower",
    name: "Гребной тренажер",
    weights: false,
  },
  {
    type: "skierg",
    name: "Лыжный тренажер",
    weights: false,
  },
  {
    type: "stability_ball",
    name: "Фитбол",
    weights: false,
  },
  {
    type: "step",
    name: "Степ-платформа",
    weights: false,
  },
  {
    type: "treadmill",
    name: "Беговая дорожка",
    weights: false,
  },
  {
    type: "wall",
    name: "Стена",
    weights: false,
  },
  {
    type: "yoga_mat",
    name: "Коврик для йоги",
    weights: false,
  },
];

export function getEquipment() {
  return equipment;
}

export function getEquipmentLabel(type: string) {
  return equipment.find((e) => e.type === type)?.name;
}

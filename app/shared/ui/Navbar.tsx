import { Link, useLocation, useNavigation } from "react-router";
import { HeartIcon } from "./icons";
import { cn } from "~/shared/lib/utils";

const links = [
  {
    label: "Тренировки",
    icon: HeartIcon,
    href: "/workouts",
  },
  {
    label: "Упражнения",
    icon: HeartIcon,
    href: "/exercises",
  },
  {
    label: "Прогресс",
    icon: HeartIcon,
    href: "/progress",
  },
  {
    label: "Профиль",
    icon: HeartIcon,
    href: "/profile",
  },
];

export const Navbar = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="fixed bottom-0 w-full px-5 pb-(--bottom-navbar)">
      <nav className="bg-navbar flex h-[70px] w-full items-center rounded-full px-2.5 backdrop-blur-[50px]">
        <div className="flex w-full items-center">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                "text-navbar-inactive flex flex-1 flex-col items-center gap-1",
                {
                  "text-navbar-active": pathname === link.href,
                },
              )}
            >
              <link.icon size={25} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

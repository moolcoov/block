import { Link, useLocation, useNavigation } from "react-router";
import { BulletListIcon, DumbBellIcon, HeartIcon, PersonIcon } from "./icons";
import { cn } from "~/shared/lib/utils";

const links = [
  {
    label: "Тренировки",
    icon: <DumbBellIcon size={30} />,
    href: "/workouts",
  },
  {
    label: "Упражнения",
    icon: <BulletListIcon size={30} />,
    href: "/exercises",
  },
  {
    label: "Профиль",
    icon: <PersonIcon size={30} />,
    href: "/profile",
  },
];

export const Navbar = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="fixed bottom-0 z-40 w-full px-5 pb-(--bottom-navbar)">
      <nav className="bg-navbar flex h-[70px] w-full items-center rounded-full px-2.5 backdrop-blur-lg">
        <div className="flex w-full items-center">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                "text-navbar-inactive flex flex-1 flex-col items-center gap-1 transition-transform active:scale-[0.9]",
                {
                  "text-navbar-active": pathname === link.href,
                },
              )}
            >
              {link.icon}
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

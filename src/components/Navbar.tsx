"use client";

import * as React from "react";
import Link from "next/link";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  Menu,
  X,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@base-ui/react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

// flat list used for the mobile dropdown (NavigationMenu's hover/trigger
// pattern doesn't translate well to a mobile accordion, so mobile gets
// simple stacked links instead)
const mobileLinks = [
  { title: "Introduction", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Typography", href: "/docs/primitives/typography" },
  { title: "Docs", href: "/docs" },
];

export function NavigationMenuDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-40 bg-blue-300 w-full px-4 py-2 ">
      {/* Top bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full">
        {/* Logo - right on desktop, left on mobile */}
        <Link href="/" className="shrink-0 justify-self-start">
          <span className="text-2xl font-bold">Ezycourse</span>
        </Link>

        {/* Nav items - middle, desktop only */}
        <div className="hidden md:flex justify-self-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-96">
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built with Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Pricing </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-96">
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built with Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:flex">
                <NavigationMenuTrigger>Websites</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px]">
                    <li>
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2"
                          >
                            <CircleAlertIcon />
                            Backlog
                          </Link>
                        }
                      />
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2"
                          >
                            <CircleDashedIcon />
                            To Do
                          </Link>
                        }
                      />
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2"
                          >
                            <CircleCheckIcon />
                            Done
                          </Link>
                        }
                      />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/docs">Docs</Link>}
                />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Login button - desktop only, right */}
        <div className="hidden md:block justify-self-end">
          <Button className="cursor-pointer bg-slate-900 px-4 py-2 text-sm text-white rounded-2xl">
            <a href="login">login</a>
          </Button>
        </div>

        {/* Hamburger - mobile only, right */}
        <button
          className="md:hidden justify-self-end"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-1 border-t pt-3">
          {mobileLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="px-2 py-2 text-sm rounded-md hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <Button
            className="cursor-pointer bg-slate-900 px-4 py-2 text-sm text-white rounded-2xl mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            <a href="login">login</a>
          </Button>
        </div>
      )}
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}

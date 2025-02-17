import {
  ChevronDown,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  MessageSquare,
  Receipt,
  Users2,
  Tag,
  Paintbrush,
  Clock,
  Settings,
  Plus,
  List,
  Grid3X3,
  CheckCircle,
  XCircle,
  FileText,
  Store,
  Percent,
  Palette,
  Sliders,
  Bell,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: Package,
    children: [
      {
        title: "Add Product",
        href: "/admin/products/create",
        icon: Plus,
      },
      {
        title: "Product List",
        href: "/admin/products",
        icon: List,
      },
      {
        title: "Categories",
        href: "/admin/products/categories",
        icon: Grid3X3,
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    children: [
      {
        title: "All Orders",
        href: "/admin/orders",
        icon: List,
      },
      {
        title: "Order Details",
        href: "/admin/orders/:id",
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    children: [
      {
        title: "All Customers",
        href: "/admin/customers",
        icon: List,
      },
      {
        title: "Add Customer",
        href: "/admin/customers/create",
        icon: Plus,
      },
      {
        title: "Customer Details",
        href: "/admin/customers/details",
        icon: FileText,
      },
    ],
  },
  {
    title: "Statistics",
    icon: BarChart2,
    children: [
      {
        title: "Sales Analytics",
        href: "/admin/statistics/sales",
        icon: BarChart2,
      },
      {
        title: "Customer Analytics",
        href: "/admin/statistics/customers",
        icon: Users,
      },
      {
        title: "Product Analytics",
        href: "/admin/statistics/products",
        icon: Package,
      },
    ],
  },
  {
    title: "Reviews",
    icon: MessageSquare,
    children: [
      {
        title: "All Reviews",
        href: "/admin/reviews",
        icon: List,
      },
      {
        title: "Pending Reviews",
        href: "/admin/reviews/pending",
        icon: Clock,
      },
    ],
  },
  {
    title: "Transactions",
    icon: Receipt,
    children: [
      {
        title: "All Transactions",
        href: "/admin/transactions",
        icon: List,
      },
      {
        title: "Refunds",
        href: "/admin/transactions/refunds",
        icon: Receipt,
      },
    ],
  },
  {
    title: "Sellers",
    icon: Users2,
    children: [
      {
        title: "All Sellers",
        href: "/admin/sellers",
        icon: Store,
      },
      {
        title: "Add Seller",
        href: "/admin/sellers/create",
        icon: Plus,
      },
      {
        title: "Verification",
        href: "/admin/sellers/verification",
        icon: CheckCircle,
      },
    ],
  },
  {
    title: "Hot Offers",
    icon: Tag,
    children: [
      {
        title: "Active Offers",
        href: "/admin/offers",
        icon: Tag,
      },
      {
        title: "Create Offer",
        href: "/admin/offers/create",
        icon: Plus,
      },
      {
        title: "Discounts",
        href: "/admin/offers/discounts",
        icon: Percent,
      },
    ],
  },
  {
    title: "Appearance",
    icon: Paintbrush,
    children: [
      {
        title: "Themes",
        href: "/admin/appearance/themes",
        icon: Palette,
      },
      {
        title: "Customize",
        href: "/admin/appearance/customize",
        icon: Paintbrush,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      {
        title: "General",
        href: "/admin/settings",
        icon: Sliders,
      },
      {
        title: "Security",
        href: "/admin/settings/security",
        icon: Settings,
      },
      {
        title: "Notifications",
        href: "/admin/settings/notifications",
        icon: Bell,
      },
    ],
  },
];

export function SidebarNav() {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (title) => {
    setOpenItems((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item) => {
        if (!item.children) {
          return (
            <Button
              key={item.title}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                location.pathname === item.href &&
                  "bg-yellow-50 text-yellow-600"
              )}
              asChild
            >
              <a href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </a>
            </Button>
          );
        }

        return (
          <Collapsible
            key={item.title}
            open={openItems.includes(item.title)}
            onOpenChange={() => toggleItem(item.title)}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between gap-2">
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    openItems.includes(item.title) && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 space-y-1">
              {item.children.map((child) => (
                <Button
                  key={child.title}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    location.pathname === child.href &&
                      "bg-yellow-50 text-yellow-600"
                  )}
                  asChild
                >
                  <a href={child.href}>
                    <child.icon className="h-4 w-4" />
                    {child.title}
                  </a>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

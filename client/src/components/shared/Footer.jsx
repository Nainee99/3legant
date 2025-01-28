import { Instagram, Facebook, Youtube } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Product", href: "/product" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#141718] text-white">
      <div className="container mx-auto px-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-white/10">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">3legant</h2>
            <span className="text-white/60">|</span>
            <span className="text-white/60">Headphone Store</span>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    to={item.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <span className="text-white/60 text-sm">
              Copyright © 2023 3legant. All rights reserved
            </span>
            <div className="flex gap-4">
              <a
                to="/privacy"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                to="/terms"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/60 hover:text-white transition-colors"
                aria-label={item.name}
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

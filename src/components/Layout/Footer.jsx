import React from "react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Features", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Membership", href: "#" },
  ];

  const resources = [
    { name: "Blog", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "API Documentation", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  const contactInfo = [
    "support@logoipsum.com",
    "+1 (555) 123-4567",
    "123 Crypto Street, Digital City",
  ];

  return (
    <footer className="py-12 bg-black border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="text-2xl font-bold mb-6">
              logo{" "}
              <span className="inline-flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full">
                <span className="text-sm">®</span>
              </span>{" "}
              ipsum
            </div>
            <p className="text-gray-400">
              A new era of cryptocurrency exchange with zero fees and maximum
              security.
            </p>
          </div>

          <FooterColumn title="Quick Links" items={quickLinks} isLink={true} />
          <FooterColumn title="Resources" items={resources} isLink={true} />
          <FooterColumn title="Contact Us" items={contactInfo} isLink={false} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2025 Logo Ipsum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, items, isLink }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">{title}</h3>
    <ul className="space-y-2 text-gray-400">
      {items.map((item, index) => (
        <li key={index}>
          {isLink ? (
            <a href={item.href} className="hover:text-white transition-colors">
              {item.name}
            </a>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;

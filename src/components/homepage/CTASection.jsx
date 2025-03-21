/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-gray-900 to-black">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Start Trading?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Join thousands of traders who are already experiencing the future of
          cryptocurrency exchange.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium py-4 px-10 rounded-full hover:from-red-600 hover:to-orange-600 transition-all"
        >
          Download App Now
        </motion.button>
      </div>
    </section>
  );
};

export default CTASection;

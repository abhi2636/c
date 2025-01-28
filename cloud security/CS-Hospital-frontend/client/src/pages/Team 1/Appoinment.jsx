import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import AppointmentForm from "../../components/Team 1/AppoinmentForm";
import { motion } from "framer-motion";

const Appointment = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <motion.main
        className="flex-grow p-6 bg-gradient-to-b from-green-200 via-green-200 to-green-200 rounded-l-lg shadow-xl"
        animate={{
          marginLeft: isOpen ? "17rem" : "4.5rem",
        }}
        transition={{
          duration: 0.4,
          type: "linear",
        }}
      >
        <AppointmentForm />
      </motion.main>
    </div>
  );
};

export default Appointment;

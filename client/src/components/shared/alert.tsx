"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error';
}

const SuccessIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ scale: 0 }}
    animate={{ scale: 1, rotate: 360 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </motion.svg>
);

const ErrorIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ scale: 0 }}
    animate={{ scale: 1, rotate: 360 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </motion.svg>
);

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, title, message, type }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className={`${type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            {type === 'success' ? (
              <div className="text-green-500">
                <SuccessIcon />
              </div>
            ) : (
              <div className="text-red-500">
                <ErrorIcon />
              </div>
            )}
            <AlertDialogTitle className={`${type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className={`${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            className={`${type === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
          >
            Close
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;

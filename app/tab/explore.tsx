import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function CustomModal({ visible, onClose, title, children }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          {children}
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // bg-black/50
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF', // bg-white
    padding: 24, // p-6
    borderRadius: 16, // rounded-2xl
    width: '91.666%', // w-11/12 (11/12 = 91.666%)
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20, // text-xl
    fontWeight: 'bold', // font-bold
    marginBottom: 16, // mb-4
    color: '#1F2937',
  },
  closeButton: {
    marginTop: 16, // mt-4
    backgroundColor: '#374151', // bg-gray-800
    padding: 12, // p-3
    borderRadius: 8, // rounded-lg
  },
  closeButtonText: {
    color: '#FFFFFF', // text-white
    textAlign: 'center',
    fontWeight: '600', // font-semibold
    fontSize: 16,
  },
});
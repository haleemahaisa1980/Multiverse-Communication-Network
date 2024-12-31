import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Secure Message Storage Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('store-message', () => {
    it('should store a message successfully', async () => {
      const encryptedContent = Buffer.from('Encrypted message content');
      const protocolId = 1;
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new message ID
      
      const result = await mockContractCall('secure-message-storage', 'store-message', [encryptedContent, protocolId]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('secure-message-storage', 'store-message', [encryptedContent, protocolId]);
    });
  });
  
  describe('get-message', () => {
    it('should return message details', async () => {
      const messageId = 1;
      const expectedMessage = {
        sender: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        encrypted_content: Buffer.from('Encrypted message content'),
        timestamp: 123456,
        protocol_id: 1
      };
      
      mockContractCall.mockResolvedValue({ value: expectedMessage });
      
      const result = await mockContractCall('secure-message-storage', 'get-message', [messageId]);
      
      expect(result.value).toEqual(expectedMessage);
      expect(mockContractCall).toHaveBeenCalledWith('secure-message-storage', 'get-message', [messageId]);
    });
    
    it('should return null for non-existent message', async () => {
      const messageId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('secure-message-storage', 'get-message', [messageId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-message-count', () => {
    it('should return the total number of messages', async () => {
      const expectedCount = 10;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('secure-message-storage', 'get-message-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('secure-message-storage', 'get-message-count', []);
    });
  });
});


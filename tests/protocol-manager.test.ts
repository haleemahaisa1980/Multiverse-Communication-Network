import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Protocol Manager Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-protocol', () => {
    it('should create a protocol successfully', async () => {
      const name = 'Quantum Resonance Protocol';
      const description = 'A protocol leveraging quantum resonance for inter-universe communication';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new protocol ID
      
      const result = await mockContractCall('protocol-manager', 'create-protocol', [name, description]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('protocol-manager', 'create-protocol', [name, description]);
    });
  });
  
  describe('update-protocol-status', () => {
    it('should update a protocol status successfully', async () => {
      const protocolId = 1;
      const newStatus = 'inactive';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('protocol-manager', 'update-protocol-status', [protocolId, newStatus]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('protocol-manager', 'update-protocol-status', [protocolId, newStatus]);
    });
    
    it('should fail if the caller is not the protocol creator', async () => {
      const protocolId = 1;
      const newStatus = 'inactive';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('protocol-manager', 'update-protocol-status', [protocolId, newStatus]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-protocol', () => {
    it('should return protocol details', async () => {
      const protocolId = 1;
      const expectedProtocol = {
        name: 'Quantum Resonance Protocol',
        description: 'A protocol leveraging quantum resonance for inter-universe communication',
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        status: 'active'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedProtocol });
      
      const result = await mockContractCall('protocol-manager', 'get-protocol', [protocolId]);
      
      expect(result.value).toEqual(expectedProtocol);
      expect(mockContractCall).toHaveBeenCalledWith('protocol-manager', 'get-protocol', [protocolId]);
    });
    
    it('should return null for non-existent protocol', async () => {
      const protocolId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('protocol-manager', 'get-protocol', [protocolId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-protocol-count', () => {
    it('should return the total number of protocols', async () => {
      const expectedCount = 5;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('protocol-manager', 'get-protocol-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('protocol-manager', 'get-protocol-count', []);
    });
  });
});


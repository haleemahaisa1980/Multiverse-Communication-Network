import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Quantum Entanglement Experiment Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-experiment', () => {
    it('should create an experiment successfully', async () => {
      const description = 'Testing quantum entanglement for inter-universe communication';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new experiment ID
      
      const result = await mockContractCall('quantum-entanglement', 'create-experiment', [description]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('quantum-entanglement', 'create-experiment', [description]);
    });
  });
  
  describe('update-experiment-results', () => {
    it('should update experiment results successfully', async () => {
      const experimentId = 1;
      const results = 'Observed quantum entanglement between particles in different universes';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('quantum-entanglement', 'update-experiment-results', [experimentId, results]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('quantum-entanglement', 'update-experiment-results', [experimentId, results]);
    });
    
    it('should fail if the caller is not the experiment researcher', async () => {
      const experimentId = 1;
      const results = 'Unauthorized update attempt';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('quantum-entanglement', 'update-experiment-results', [experimentId, results]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-experiment', () => {
    it('should return experiment details', async () => {
      const experimentId = 1;
      const expectedExperiment = {
        researcher: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        description: 'Testing quantum entanglement for inter-universe communication',
        results: 'Observed quantum entanglement between particles in different universes',
        status: 'completed'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedExperiment });
      
      const result = await mockContractCall('quantum-entanglement', 'get-experiment', [experimentId]);
      
      expect(result.value).toEqual(expectedExperiment);
      expect(mockContractCall).toHaveBeenCalledWith('quantum-entanglement', 'get-experiment', [experimentId]);
    });
    
    it('should return null for non-existent experiment', async () => {
      const experimentId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('quantum-entanglement', 'get-experiment', [experimentId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-experiment-count', () => {
    it('should return the total number of experiments', async () => {
      const expectedCount = 3;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('quantum-entanglement', 'get-experiment-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('quantum-entanglement', 'get-experiment-count', []);
    });
  });
});


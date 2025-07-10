import { describe, it, expect, beforeEach } from "vitest"

describe("Facility Manager Verification Contract", () => {
  let contractState
  
  beforeEach(() => {
    contractState = {
      facilityManagers: new Map(),
      managerDetails: new Map(),
      contractOwner: "SP1HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK",
    }
  })
  
  describe("verify-manager", () => {
    it("should verify a new manager successfully", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      const name = "John Smith"
      const facilityId = "FAC001"
      const certLevel = 3
      
      const result = verifyManager(contractState, manager, name, facilityId, certLevel, contractState.contractOwner)
      
      expect(result.success).toBe(true)
      expect(contractState.facilityManagers.get(manager)).toBe(true)
      expect(contractState.managerDetails.get(manager)).toEqual({
        name: name,
        facilityId: facilityId,
        certificationLevel: certLevel,
        verifiedAt: expect.any(Number),
      })
    })
    
    it("should reject verification from non-owner", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      const unauthorizedCaller = "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE"
      
      const result = verifyManager(contractState, manager, "John", "FAC001", 3, unauthorizedCaller)
      
      expect(result.success).toBe(false)
      expect(result.error).toBe("ERR-NOT-AUTHORIZED")
    })
    
    it("should reject already verified manager", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      contractState.facilityManagers.set(manager, true)
      
      const result = verifyManager(contractState, manager, "John", "FAC001", 3, contractState.contractOwner)
      
      expect(result.success).toBe(false)
      expect(result.error).toBe("ERR-ALREADY-VERIFIED")
    })
  })
  
  describe("is-verified-manager", () => {
    it("should return true for verified manager", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      contractState.facilityManagers.set(manager, true)
      
      const result = isVerifiedManager(contractState, manager)
      
      expect(result).toBe(true)
    })
    
    it("should return false for unverified manager", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      
      const result = isVerifiedManager(contractState, manager)
      
      expect(result).toBe(false)
    })
  })
  
  describe("get-manager-details", () => {
    it("should return manager details for verified manager", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      const details = {
        name: "John Smith",
        facilityId: "FAC001",
        certificationLevel: 3,
        verifiedAt: 12345,
      }
      contractState.managerDetails.set(manager, details)
      
      const result = getManagerDetails(contractState, manager)
      
      expect(result).toEqual(details)
    })
    
    it("should return null for non-existent manager", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      
      const result = getManagerDetails(contractState, manager)
      
      expect(result).toBeNull()
    })
  })
  
  describe("revoke-manager", () => {
    it("should revoke manager successfully", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      contractState.facilityManagers.set(manager, true)
      contractState.managerDetails.set(manager, {
        name: "John",
        facilityId: "FAC001",
        certificationLevel: 3,
        verifiedAt: 12345,
      })
      
      const result = revokeManager(contractState, manager, contractState.contractOwner)
      
      expect(result.success).toBe(true)
      expect(contractState.facilityManagers.has(manager)).toBe(false)
      expect(contractState.managerDetails.has(manager)).toBe(false)
    })
    
    it("should reject revocation from non-owner", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      const unauthorizedCaller = "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE"
      
      const result = revokeManager(contractState, manager, unauthorizedCaller)
      
      expect(result.success).toBe(false)
      expect(result.error).toBe("ERR-NOT-AUTHORIZED")
    })
  })
})

// Mock contract functions
function verifyManager(state, manager, name, facilityId, certLevel, caller) {
  if (caller !== state.contractOwner) {
    return { success: false, error: "ERR-NOT-AUTHORIZED" }
  }
  
  if (state.facilityManagers.has(manager)) {
    return { success: false, error: "ERR-ALREADY-VERIFIED" }
  }
  
  state.facilityManagers.set(manager, true)
  state.managerDetails.set(manager, {
    name,
    facilityId,
    certificationLevel: certLevel,
    verifiedAt: Date.now(),
  })
  
  return { success: true }
}

function isVerifiedManager(state, manager) {
  return state.facilityManagers.get(manager) || false
}

function getManagerDetails(state, manager) {
  return state.managerDetails.get(manager) || null
}

function revokeManager(state, manager, caller) {
  if (caller !== state.contractOwner) {
    return { success: false, error: "ERR-NOT-AUTHORIZED" }
  }
  
  if (!state.facilityManagers.has(manager)) {
    return { success: false, error: "ERR-NOT-FOUND" }
  }
  
  state.facilityManagers.delete(manager)
  state.managerDetails.delete(manager)
  
  return { success: true }
}

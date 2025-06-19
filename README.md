# Blockchain-Based Facilities Energy Management System

A comprehensive blockchain solution for managing facility energy consumption, optimization, cost allocation, and sustainability tracking using Stacks blockchain and Clarity smart contracts.

## Overview

This system provides a decentralized platform for facility managers to:
- Verify their credentials and manage facilities
- Monitor real-time energy consumption and production
- Optimize energy usage through algorithmic recommendations
- Allocate energy costs across departments
- Track sustainability metrics and carbon footprint

## Smart Contracts

### 1. Facility Manager Verification (`facility-manager-verification.clar`)
- **Purpose**: Validates and manages facility manager credentials
- **Key Functions**:
    - `verify-manager`: Verify a facility manager with certification details
    - `is-verified-manager`: Check if a manager is verified
    - `get-manager-details`: Retrieve manager information
    - `revoke-manager`: Revoke manager verification

### 2. Energy Monitoring (`energy-monitoring.clar`)
- **Purpose**: Records and tracks facility energy usage data
- **Key Functions**:
    - `record-energy-reading`: Record energy consumption and production data
    - `get-energy-reading`: Retrieve specific energy readings
    - `get-facility-totals`: Get aggregated facility energy data
    - `get-average-consumption`: Calculate average energy consumption

### 3. Optimization Algorithm (`optimization-algorithm.clar`)
- **Purpose**: Provides energy consumption optimization recommendations
- **Key Functions**:
    - `set-optimization-profile`: Configure optimization targets and recommendations
    - `calculate-optimization`: Calculate potential energy savings
    - `get-optimization-profile`: Retrieve optimization settings
    - `get-optimization-history`: View historical optimization data

### 4. Cost Allocation (`cost-allocation.clar`)
- **Purpose**: Manages energy cost distribution and billing
- **Key Functions**:
    - `set-cost-rates`: Configure energy pricing rates
    - `allocate-costs`: Distribute costs across departments
    - `get-cost-allocation`: Retrieve cost allocation data
    - `calculate-department-cost`: Calculate specific department costs

### 5. Sustainability Tracking (`sustainability-tracking.clar`)
- **Purpose**: Tracks environmental impact and sustainability metrics
- **Key Functions**:
    - `set-carbon-factors`: Configure regional carbon emission factors
    - `calculate-sustainability-metrics`: Calculate environmental metrics
    - `set-sustainability-goals`: Define sustainability targets
    - `check-goal-progress`: Monitor progress toward sustainability goals

## Features

### 🔐 Secure Manager Verification
- Blockchain-based credential verification
- Certification level tracking
- Revocable access control

### 📊 Real-time Energy Monitoring
- Consumption and production tracking
- Historical data storage
- Automated calculations and aggregations

### 🎯 Smart Optimization
- Algorithm-based recommendations
- Customizable efficiency targets
- Performance tracking and history

### 💰 Transparent Cost Management
- Flexible rate structures
- Department-level cost allocation
- Automated billing calculations

### 🌱 Sustainability Compliance
- Carbon footprint calculation
- Renewable energy percentage tracking
- Goal setting and progress monitoring

## Getting Started

### Prerequisites
- Stacks blockchain node
- Clarity development environment
- Node.js and npm for testing

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd blockchain-energy-management
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run tests:
   \`\`\`bash
   npm test
   \`\`\`

### Deployment

1. Deploy contracts to Stacks testnet:
   \`\`\`bash
   clarinet deploy --testnet
   \`\`\`

2. Verify deployment:
   \`\`\`bash
   clarinet console
   \`\`\`

## Usage Examples

### Verify a Facility Manager
\`\`\`clarity
(contract-call? .facility-manager-verification verify-manager
'SP1HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK
"John Smith"
"FAC001"
u3)
\`\`\`

### Record Energy Reading
\`\`\`clarity
(contract-call? .energy-monitoring record-energy-reading
"FAC001"
u1500
u200
"METER001")
\`\`\`

### Calculate Optimization
\`\`\`clarity
(contract-call? .optimization-algorithm calculate-optimization "FAC001")
\`\`\`

## Architecture

The system follows a modular architecture with interconnected smart contracts:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Facility Manager                         │
│                   Verification Contract                     │
└─────────────────────┬───────────────────────────────────────┘
│
┌───────┴───────┐
│               │
▼               ▼
┌─────────────────────┐ ┌─────────────────────┐
│   Energy Monitoring │ │  Sustainability     │
│      Contract       │ │   Tracking Contract │
└─────────┬───────────┘ └─────────┬───────────┘
│                       │
▼                       ▼
┌─────────────────────┐ ┌─────────────────────┐
│   Optimization      │ │   Cost Allocation   │
│  Algorithm Contract │ │      Contract       │
└─────────────────────┘ └─────────────────────┘
\`\`\`

## Security Considerations

- All functions require proper authorization through manager verification
- Input validation prevents invalid data entry
- Access control ensures only verified managers can modify data
- Immutable blockchain storage provides audit trail

## Testing

The project includes comprehensive tests using Vitest:

\`\`\`bash
npm run test
\`\`\`

Tests cover:
- Contract deployment and initialization
- Manager verification workflows
- Energy monitoring functionality
- Optimization calculations
- Cost allocation logic
- Sustainability metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the GitHub repository.

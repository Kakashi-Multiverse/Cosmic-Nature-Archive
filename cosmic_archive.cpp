/**
 * @file cosmic_archive.cpp
 * @brief Cosmic Nature Archive Core Engine
 * @details Multiverse ecosystem data management and restoration platform.
 * @author Cosmic Nature Archive Team
 * @version 2.5.0-multiverse
 */

#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <chrono>
#include <iomanip>
#include <algorithm>
#include <unordered_map>

// Multiverse system version constant
const std::string ARCHIVE_VERSION = "v2.5.0-Multiverse-AutoUpdate";

/**
 * @brief Types of cosmic natural entities
 */
enum class SectorType {
    FLORA,          // Cosmic vegetation & plant life
    FAUNA,          // Multiverse wildlife
    DIMENSIONAL_ELEM // Spacetime & elemental entities
};

/**
 * @brief Multiverse coordinate data structure
 */
struct MultiverseCoordinates {
    std::string dimensionId;  // e.g., "Dimension-C137", "Sector-Alpha"
    double quantumFrequency;  // Quantum frequency in Hz
    int timelinePhase;        // Timeline phase
};

/**
 * @brief Class representing a cosmic natural entity or species
 */
class CosmicEntity {
private:
    std::string name;
    SectorType type;
    MultiverseCoordinates location;
    double healthIndex; // Health/restoration percentage (0.0 to 100.0%)
    std::string conservationStatus;

public:
    CosmicEntity(std::string n, SectorType t, MultiverseCoordinates loc, double health, std::string status)
        : name(std::move(n)), type(t), location(std::move(loc)), healthIndex(health), conservationStatus(std::move(status)) {}

    std::string getName() const { return name; }
    double getHealthIndex() const { return healthIndex; }
    
    void setHealthIndex(double newIndex) {
        healthIndex = std::clamp(newIndex, 0.0, 100.0);
    }

    std::string getTypeString() const {
        switch (type) {
            case SectorType::FLORA: return "Flora";
            case SectorType::FAUNA: return "Fauna";
            case SectorType::DIMENSIONAL_ELEM: return "Dimensional Elemental";
            default: return "Unknown";
        }
    }

    void displayInfo() const {
        std::cout << "  [Entity]: " << std::left << std::setw(20) << name 
                  << " | Type: " << std::setw(23) << getTypeString()
                  << " | Origin: " << std::setw(16) << location.dimensionId
                  << " | Health: " << std::fixed << std::setprecision(1) << healthIndex << "%"
                  << " | Status: " << conservationStatus << "\n";
    }
};

/**
 * @brief Management system for the Cosmic Nature Archive
 */
class CosmicArchiveManager {
private:
    std::vector<std::shared_ptr<CosmicEntity>> archiveRecords;
    bool isAutoUpdateEnabled;

public:
    CosmicArchiveManager() : isAutoUpdateEnabled(true) {}

    /**
     * @brief Register a new ecological entity into the database
     */
    void addEntity(const std::shared_ptr<CosmicEntity>& entity) {
        archiveRecords.push_back(entity);
        std::cout << ">> [Registered]: Successfully stored '" << entity->getName() << "' in the core archive.\n";
    }

    /**
     * @brief Check for automatic system updates across the multiverse
     */
    void checkForSystemUpdates() {
        std::cout << "\n[SYSTEM]: Checking for multiverse system updates...\n";
        if (isAutoUpdateEnabled) {
            std::cout << ">> [Success]: System updated to the latest release: " << ARCHIVE_VERSION << "\n";
        }
    }

    /**
     * @brief Scan the multiverse ecosystem and display analytical reports
     */
    void scanEcosystems() const {
        std::cout << "\n========================================================================================\n";
        std::cout << "                 COSMIC NATURE ARCHIVE - MULTIVERSE ECOSYSTEM REPORT                    \n";
        std::cout << "========================================================================================\n";

        if (archiveRecords.empty()) {
            std::cout << "No species or entities currently recorded.\n";
            return;
        }

        double totalHealth = 0.0;
        for (const auto& record : archiveRecords) {
            record->displayInfo();
            totalHealth += record->getHealthIndex();
        }

        double averageHealth = totalHealth / archiveRecords.size();
        std::cout << "----------------------------------------------------------------------------------------\n";
        std::cout << "Total Tracked Entities: " << archiveRecords.size() << "\n";
        std::cout << "Ecosystem Average Recovery Index: " << std::fixed << std::setprecision(2) << averageHealth << "%\n";
        std::cout << "========================================================================================\n";
    }

    /**
     * @brief Emit a cosmic pulse to boost recovery of endangered species
     */
    void triggerCosmicRestorationPulse() {
        std::cout << "\n[ACTION]: Emitting cosmic restoration pulse across dimensions...\n";
        for (auto& record : archiveRecords) {
            if (record->getHealthIndex() < 80.0) {
                double boosted = record->getHealthIndex() + 15.5;
                record->setHealthIndex(boosted);
            }
        }
        std::cout << ">> [Completed]: Energy restored to vulnerable dimensional sectors.\n";
    }
};

// ==================== MAIN ENTRY POINT ====================
int main() {
    std::cout << "====================================================\n";
    std::cout << "      INITIALIZING COSMIC NATURE ARCHIVE CORE       \n";
    std::cout << "====================================================\n";

    CosmicArchiveManager manager;

    // Check for version updates
    manager.checkForSystemUpdates();

    // Populate data from various multiverse dimensions
    std::cout << "\n[1] Loading ecological data across dimensions...\n";
    
    auto panther = std::make_shared<CosmicEntity>(
        "Nebula Panther", 
        SectorType::FAUNA, 
        MultiverseCoordinates{"Dimension-C137", 432.85, 1}, 
        65.0, 
        "Needs Restoration"
    );

    auto flora = std::make_shared<CosmicEntity>(
        "Starlight Flora", 
        SectorType::FLORA, 
        MultiverseCoordinates{"Dimension-Alpha", 888.12, 4}, 
        92.0, 
        "Thriving"
    );

    auto crystal = std::make_shared<CosmicEntity>(
        "Chrono Crystal", 
        SectorType::DIMENSIONAL_ELEM, 
        MultiverseCoordinates{"Dimension-T9", 104.22, 9}, 
        45.0, 
        "Critically Endangered"
    );

    manager.addEntity(panther);
    manager.addEntity(flora);
    manager.addEntity(crystal);

    // Initial scan
    manager.scanEcosystems();

    // Trigger restoration initiative
    manager.triggerCosmicRestorationPulse();

    // Scan post-restoration
    manager.scanEcosystems();

    std::cout << "\n[Update]: System execution complete. Ready for GitHub sync.\n";
    return 0;
}


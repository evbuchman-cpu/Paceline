import { generateGuidePDF, getGuideHTML } from '@/lib/pdf-generator';
import { NextResponse } from 'next/server';
import type { GuideData, QuestionnaireData } from '@/lib/pdf-generator';

// Sample data for testing PDF generation
const sampleGuideData: GuideData = {
  raceOverview: {
    description: "The Wasatch Front 100 is one of America's most challenging mountain ultramarathons, traversing the rugged Wasatch Mountains from Kaysville to Midway, Utah. Known for its relentless climbing and technical terrain, this race tests both physical endurance and mental fortitude across 100 miles of mountain trails.",
    distance: 100,
    elevationGain: 26800,
    elevationProfile: [
      { mile: 0, elevation: 4800, landmark: "Kaysville Start" },
      { mile: 25, elevation: 9350, landmark: "Session Ridge" },
      { mile: 50, elevation: 8750, landmark: "Lamb's Canyon" },
      { mile: 75, elevation: 9500, landmark: "Scott's Peak" },
      { mile: 100, elevation: 5500, landmark: "Soldier Hollow" }
    ],
    aidStations: [
      { name: "Francis Peak", mile: 10.8, cutoff: "4:00", crewAccess: false, dropBagAccess: true, services: ["Water", "Sports drink", "Basic snacks"] },
      { name: "Bountiful B", mile: 18.2, cutoff: "6:30", crewAccess: true, dropBagAccess: true, services: ["Water", "Sports drink", "Hot food", "Medical"] },
      { name: "Sessions Lift-Off", mile: 25.1, cutoff: "9:00", crewAccess: true, dropBagAccess: true, services: ["Full aid", "Crew access", "Drop bags"] },
      { name: "Swallow Rocks", mile: 33.6, cutoff: "12:30", crewAccess: true, dropBagAccess: true, services: ["Water", "Sports drink", "Snacks"] },
      { name: "Big Mountain", mile: 39.8, cutoff: "15:00", crewAccess: true, dropBagAccess: true, services: ["Full aid", "Hot food", "Medical"] },
      { name: "Lamb's Canyon", mile: 50.1, cutoff: "19:00", crewAccess: true, dropBagAccess: true, services: ["Full aid", "Crew access", "Sleep station"] },
      { name: "Upper Big Water", mile: 60.2, cutoff: "23:00", crewAccess: false, dropBagAccess: false, services: ["Water", "Sports drink", "Basic snacks"] },
      { name: "Desolation Lake", mile: 70.1, cutoff: "27:00", crewAccess: false, dropBagAccess: true, services: ["Water", "Sports drink", "Snacks"] },
      { name: "Scott's Peak", mile: 78.2, cutoff: "30:00", crewAccess: true, dropBagAccess: true, services: ["Full aid", "Hot food", "Medical"] },
      { name: "Ant Knolls", mile: 90.3, cutoff: "33:30", crewAccess: true, dropBagAccess: true, services: ["Full aid", "Crew access"] },
      { name: "Soldier Hollow Finish", mile: 100, cutoff: "36:00", crewAccess: true, dropBagAccess: false, services: ["Finish line", "Awards", "Food"] }
    ],
    weatherPatterns: {
      month: "September",
      avgHighTemp: 72,
      avgLowTemp: 42,
      precipitation: "10% chance of afternoon thunderstorms",
      sunriseTime: "7:08 AM",
      sunsetTime: "7:34 PM"
    },
    toughSections: [
      { name: "Francis Peak Climb", miles: "5-10.8", difficulty: "hard", elevationChange: "+3,500'", notes: "Steep initial climb to first aid. Start conservative here to save legs for later." },
      { name: "Sessions to Swallow", miles: "25-34", difficulty: "brutal", elevationChange: "+4,200' / -3,100'", notes: "Technical ridgeline with exposed sections. Most runnable but rolling. Watch footing." },
      { name: "Desolation Lake", miles: "65-70", difficulty: "hard", elevationChange: "+2,800'", notes: "Night climb when fatigue sets in. Focus on consistent effort and fueling." },
      { name: "Scott's Peak", miles: "75-78", difficulty: "brutal", elevationChange: "+3,100'", notes: "Final major climb. Mental game is key here. Break into small chunks." }
    ],
    courseNotes: "Carry required gear at all times including headlamp, emergency blanket, and minimum 20oz fluids. Cell service is spotty throughout. Course is well-marked with ribbons and glow sticks at night."
  },
  pacingStrategy: {
    sections: [
      { name: "Start to Francis Peak", startMile: 0, endMile: 10.8, distance: 10.8, elevationGain: 3500, elevationLoss: 500, terrainType: "Mountain climb", targetPace: "22:00", sectionTime: "3:58", cumulativeTime: "3:58", cumulativeMile: 10.8, notes: "Conservative start, save energy" },
      { name: "Francis to Bountiful B", startMile: 10.8, endMile: 18.2, distance: 7.4, elevationGain: 1200, elevationLoss: 2800, terrainType: "Runnable descent", targetPace: "14:30", sectionTime: "1:47", cumulativeTime: "5:45", cumulativeMile: 18.2, notes: "Controlled descent, don't bomb quads" },
      { name: "Bountiful to Sessions", startMile: 18.2, endMile: 25.1, distance: 6.9, elevationGain: 2100, elevationLoss: 600, terrainType: "Technical climb", targetPace: "18:00", sectionTime: "2:04", cumulativeTime: "7:49", cumulativeMile: 25.1, notes: "Steady climb, hike the steeps" },
      { name: "Sessions to Swallow", startMile: 25.1, endMile: 33.6, distance: 8.5, elevationGain: 1800, elevationLoss: 2400, terrainType: "Rolling ridgeline", targetPace: "16:00", sectionTime: "2:16", cumulativeTime: "10:05", cumulativeMile: 33.6, notes: "Technical but runnable, stay focused" },
      { name: "Swallow to Big Mountain", startMile: 33.6, endMile: 39.8, distance: 6.2, elevationGain: 2200, elevationLoss: 1100, terrainType: "Steep climb", targetPace: "20:00", sectionTime: "2:04", cumulativeTime: "12:09", cumulativeMile: 39.8, notes: "Power hike all climbs" },
      { name: "Big Mountain to Lamb's", startMile: 39.8, endMile: 50.1, distance: 10.3, elevationGain: 1600, elevationLoss: 3200, terrainType: "Long descent", targetPace: "15:30", sectionTime: "2:40", cumulativeTime: "14:49", cumulativeMile: 50.1, notes: "Manage descent, halfway point" },
      { name: "Lamb's to Upper Big Water", startMile: 50.1, endMile: 60.2, distance: 10.1, elevationGain: 2800, elevationLoss: 1200, terrainType: "Night climbing", targetPace: "19:00", sectionTime: "3:12", cumulativeTime: "18:01", cumulativeMile: 60.2, notes: "Headlamp on, consistent effort" },
      { name: "Big Water to Desolation", startMile: 60.2, endMile: 70.1, distance: 9.9, elevationGain: 2400, elevationLoss: 2000, terrainType: "Remote section", targetPace: "18:30", sectionTime: "3:03", cumulativeTime: "21:04", cumulativeMile: 70.1, notes: "Dig deep, stay on pace" },
      { name: "Desolation to Scott's", startMile: 70.1, endMile: 78.2, distance: 8.1, elevationGain: 3100, elevationLoss: 800, terrainType: "Final big climb", targetPace: "21:00", sectionTime: "2:50", cumulativeTime: "23:54", cumulativeMile: 78.2, notes: "Last major climb, break into chunks" },
      { name: "Scott's to Ant Knolls", startMile: 78.2, endMile: 90.3, distance: 12.1, elevationGain: 1200, elevationLoss: 4200, terrainType: "Long descent", targetPace: "16:30", sectionTime: "3:20", cumulativeTime: "27:14", cumulativeMile: 90.3, notes: "Quads will hurt, keep moving" },
      { name: "Ant Knolls to Finish", startMile: 90.3, endMile: 100, distance: 9.7, elevationGain: 400, elevationLoss: 1700, terrainType: "Runnable finish", targetPace: "17:00", sectionTime: "2:45", cumulativeTime: "29:59", cumulativeMile: 100, notes: "Empty the tank, you made it!" }
    ],
    totalEstimatedTime: "29:59",
    averagePace: "18:00/mile",
    cutoffBuffer: "6+ hours",
    paceStrategy: "Start conservative to bank time on the climbs early. The key to this race is managing the descents—don't destroy your quads in the first half. Walk all climbs over 15% grade. Run the flats and gentle downhills. Save your running legs for the final 20 miles when others are walking.",
    keyPacingNotes: [
      "Never run steeper than 15% grade uphills—power hike instead",
      "Control descents in first 50 miles to save quads",
      "Target negative split: first 50 in 15:30, second 50 in 14:30",
      "Use crew stops for efficiency: in/out in under 5 minutes",
      "If ahead of pace early, bank the time—don't speed up",
      "If behind pace, don't panic until after mile 70"
    ]
  },
  cutoffManagement: {
    stations: [
      { name: "Francis Peak", mile: 10.8, cutoffTime: "4:00", predictedArrival: "3:58", bufferMinutes: 2, bufferFormatted: "+0:02", status: "red", statusEmoji: "🔴", riskLevel: "High", notes: "Tight buffer - start conservative" },
      { name: "Bountiful B", mile: 18.2, cutoffTime: "6:30", predictedArrival: "5:45", bufferMinutes: 45, bufferFormatted: "+0:45", status: "red", statusEmoji: "🔴", riskLevel: "High", notes: "Still tight - stay focused" },
      { name: "Sessions Lift-Off", mile: 25.1, cutoffTime: "9:00", predictedArrival: "7:49", bufferMinutes: 71, bufferFormatted: "+1:11", status: "yellow", statusEmoji: "🟡", riskLevel: "Medium", notes: "Building buffer" },
      { name: "Big Mountain", mile: 39.8, cutoffTime: "15:00", predictedArrival: "12:09", bufferMinutes: 171, bufferFormatted: "+2:51", status: "yellow", statusEmoji: "🟡", riskLevel: "Medium", notes: "" },
      { name: "Lamb's Canyon", mile: 50.1, cutoffTime: "19:00", predictedArrival: "14:49", bufferMinutes: 251, bufferFormatted: "+4:11", status: "green", statusEmoji: "🟢", riskLevel: "Low", notes: "Halfway point - good checkpoint" },
      { name: "Upper Big Water", mile: 60.2, cutoffTime: "23:00", predictedArrival: "18:01", bufferMinutes: 299, bufferFormatted: "+4:59", status: "green", statusEmoji: "🟢", riskLevel: "Low", notes: "" },
      { name: "Desolation Lake", mile: 70.1, cutoffTime: "27:00", predictedArrival: "21:04", bufferMinutes: 356, bufferFormatted: "+5:56", status: "green", statusEmoji: "🟢", riskLevel: "Low", notes: "" },
      { name: "Scott's Peak", mile: 78.2, cutoffTime: "30:00", predictedArrival: "23:54", bufferMinutes: 366, bufferFormatted: "+6:06", status: "green", statusEmoji: "🟢", riskLevel: "Low", notes: "" },
      { name: "Ant Knolls", mile: 90.3, cutoffTime: "33:30", predictedArrival: "27:14", bufferMinutes: 376, bufferFormatted: "+6:16", status: "green", statusEmoji: "🟢", riskLevel: "Low", notes: "" },
      { name: "Finish", mile: 100, cutoffTime: "36:00", predictedArrival: "29:59", bufferMinutes: 361, bufferFormatted: "+6:01", status: "green", statusEmoji: "🟢", riskLevel: "Low", notes: "Goal time!" }
    ],
    overallRisk: "Medium",
    criticalCheckpoints: ["Francis Peak (+0:02)", "Bountiful B (+0:45)"],
    bufferStrategy: "Your 29:00 goal has tight buffers in the first 25 miles. The first two aid stations are critical - arrive on time or early. After Sessions, your buffer builds significantly. Focus on efficiency at early aid stations and don't linger.",
    contingencyNotes: "If you fall below 1:30 buffer at any point, immediately assess: Are you eating? Drinking? Is it a low point or a trend? One bad section is recoverable. Three bad sections is a pattern that needs addressing."
  },
  crewLogistics: {
    hasCrewSupport: true,
    crewStations: [
      {
        name: "Bountiful B",
        mile: 18.2,
        predictedArrival: "5:45",
        arrivalWindow: "5:15 - 6:15",
        timeAtStation: "5-7 minutes",
        priorities: ["Refill bottles", "Swap nutrition", "Quick gear check"],
        crewTasks: ["Have cold bottles ready", "Prepare next nutrition batch", "Check for blisters"],
        gearChanges: [],
        nutritionNeeds: ["Fresh gels", "Salty snacks", "Cold drink"],
        mentalSupport: "Looking strong! Great job on Francis Peak. 82 miles to go, all according to plan.",
        warningSignsToWatch: ["Excessive sweating", "Not eating", "Negative talk"]
      },
      {
        name: "Sessions Lift-Off",
        mile: 25.1,
        predictedArrival: "7:49",
        arrivalWindow: "7:15 - 8:30",
        timeAtStation: "7-10 minutes",
        priorities: ["Full refuel", "Gear assessment", "Bathroom"],
        crewTasks: ["Full bottle swap", "Sunscreen application", "Assess clothing needs"],
        gearChanges: ["Potentially add sun shirt"],
        nutritionNeeds: ["Real food", "Salt tabs", "Full bottles"],
        mentalSupport: "Quarter done! You're executing the plan perfectly. 75 miles of adventure ahead.",
        warningSignsToWatch: ["GI distress", "Chafing starting", "Low energy"]
      },
      {
        name: "Big Mountain",
        mile: 39.8,
        predictedArrival: "12:09",
        arrivalWindow: "11:30 - 13:00",
        timeAtStation: "10-12 minutes",
        priorities: ["Hot food", "Gear change for night", "Blister check"],
        crewTasks: ["Prepare hot soup/ramen", "Layout night gear", "Full foot inspection"],
        gearChanges: ["Arm warmers ready", "Headlamp check", "Fresh socks"],
        nutritionNeeds: ["Hot food", "Coffee/caffeine", "Night nutrition"],
        mentalSupport: "Almost halfway! You're ahead of schedule. The hard climbing is behind you.",
        warningSignsToWatch: ["Shivering", "Slurred speech", "Disorientation"]
      },
      {
        name: "Lamb's Canyon",
        mile: 50.1,
        predictedArrival: "14:49",
        arrivalWindow: "14:00 - 16:00",
        timeAtStation: "15-20 minutes",
        priorities: ["Major resupply", "Night gear on", "Mental reset"],
        crewTasks: ["Full gear transition", "Hot food ready", "Foot care", "Pack night essentials"],
        gearChanges: ["Headlamp", "Extra layer", "Fresh socks", "Night nutrition"],
        nutritionNeeds: ["Substantial meal", "Caffeine", "Night snacks packed"],
        mentalSupport: "Halfway done! You're running a smart race. 50 more miles of what you trained for.",
        warningSignsToWatch: ["Wanting to quit", "Severe GI issues", "Hypothermia signs"]
      },
      {
        name: "Scott's Peak",
        mile: 78.2,
        predictedArrival: "23:54",
        arrivalWindow: "23:00 - 25:00",
        timeAtStation: "10-12 minutes",
        priorities: ["Final major stop", "Sunrise prep", "Mental boost"],
        crewTasks: ["Assess remaining needs", "Prepare for sunrise", "Final foot check"],
        gearChanges: ["Remove night layers as needed"],
        nutritionNeeds: ["Easy-to-digest calories", "Caffeine boost", "Final bottles"],
        mentalSupport: "22 miles to glory! You've crushed the hardest part. It's all downhill from here.",
        warningSignsToWatch: ["Severe fatigue", "Loss of focus", "Injury compensation"]
      },
      {
        name: "Ant Knolls",
        mile: 90.3,
        predictedArrival: "27:14",
        arrivalWindow: "26:30 - 28:00",
        timeAtStation: "5-7 minutes",
        priorities: ["Final fuel", "Quick turnaround", "Celebration prep"],
        crewTasks: ["Have finish line supplies ready", "Last bottle fill", "Emotional support"],
        gearChanges: [],
        nutritionNeeds: ["Light calories", "Fluids", "Caffeine if needed"],
        mentalSupport: "10 miles! You're going to finish! Just keep moving forward.",
        warningSignsToWatch: ["Complete shutdown", "Injury deterioration"]
      }
    ],
    crewTimingSheet: `| Station | Mile | ETA | Arrival Window | Time at Station |
|---------|------|-----|----------------|-----------------|
| Bountiful B | 18.2 | 5:45 | 5:15 - 6:15 | 5-7 min |
| Sessions | 25.1 | 7:49 | 7:15 - 8:30 | 7-10 min |
| Big Mountain | 39.8 | 12:09 | 11:30 - 13:00 | 10-12 min |
| Lamb's Canyon | 50.1 | 14:49 | 14:00 - 16:00 | 15-20 min |
| Scott's Peak | 78.2 | 23:54 | 23:00 - 25:00 | 10-12 min |
| Ant Knolls | 90.3 | 27:14 | 26:30 - 28:00 | 5-7 min |`,
    crewPackingList: [
      "Cooler with ice", "Multiple water bottles", "Sports drink mix", "Gels (variety of flavors)",
      "Real food options", "Hot food supplies (soup, ramen)", "Coffee/caffeine", "Salt tablets",
      "First aid kit", "Blister supplies", "Extra socks (3+ pairs)", "Headlamps + batteries",
      "Extra layers", "Rain jacket", "Sunscreen", "Body glide", "Chair",
      "Towel", "Wet wipes", "Phone chargers", "Cash for parking", "Course map"
    ],
    communicationPlan: "Primary: Text updates at each aid station. Backup: Race tracking app. Emergency: Race hotline. Crew should arrive 30 min before earliest ETA. No news is good news—only text if there's a change in plan.",
    emergencyProtocol: "If runner misses cutoff or needs medical: Contact race HQ immediately at the aid station. Do not attempt transport without race approval. If runner is disoriented, cold, or confused: Get them warm, fed, and evaluated by medical before any decisions."
  },
  dropBagStrategy: {
    stations: [
      {
        name: "Francis Peak",
        mile: 10.8,
        expectedArrival: "3:58",
        timeOfDay: "morning",
        weatherConditions: "Cool, possibly misty",
        packingList: [
          { item: "Gels x4", quantity: "4", reason: "Replenish used gels from start" },
          { item: "Salt tabs", quantity: "10", reason: "Morning electrolyte needs" },
          { item: "Snack bars", quantity: "2", reason: "Backup real food" }
        ],
        priorityItems: ["Gels x4", "Salt tabs"],
        notes: "Quick stop - have grab-and-go items on top"
      },
      {
        name: "Sessions Lift-Off",
        mile: 25.1,
        expectedArrival: "7:49",
        timeOfDay: "morning",
        weatherConditions: "Warming up, sun exposure",
        packingList: [
          { item: "Gels x6", quantity: "6", reason: "Major resupply for next 15 miles" },
          { item: "Sunscreen", quantity: "1", reason: "Sun protection for ridgeline" },
          { item: "Sun shirt", quantity: "1", reason: "If not already wearing" },
          { item: "Salt tabs", quantity: "20", reason: "Heavy sweating section ahead" },
          { item: "Favorite snacks", quantity: "3-4", reason: "Calorie variety" }
        ],
        priorityItems: ["Gels x6", "Salt tabs", "Sunscreen"],
        notes: "If crew isn't here, this is full nutrition reset"
      },
      {
        name: "Big Mountain",
        mile: 39.8,
        expectedArrival: "12:09",
        timeOfDay: "afternoon",
        weatherConditions: "Warmest part of day, potential thunderstorms",
        packingList: [
          { item: "Night gels x8", quantity: "8", reason: "Night nutrition is different" },
          { item: "Caffeine gels x4", quantity: "4", reason: "Night energy boost" },
          { item: "Arm warmers", quantity: "1 pair", reason: "Evening cooling" },
          { item: "Fresh socks", quantity: "1 pair", reason: "Halfway sock change" },
          { item: "Headlamp", quantity: "1", reason: "Night section ahead" },
          { item: "Extra batteries", quantity: "2 sets", reason: "Backup for long night" }
        ],
        priorityItems: ["Night gels x8", "Headlamp", "Fresh socks"],
        notes: "Major transition to night gear"
      },
      {
        name: "Desolation Lake",
        mile: 70.1,
        expectedArrival: "21:04",
        timeOfDay: "night",
        weatherConditions: "Cold, possibly below freezing",
        packingList: [
          { item: "Gels x6", quantity: "6", reason: "Final push nutrition" },
          { item: "Extra layer", quantity: "1", reason: "Coldest hours" },
          { item: "Hand warmers", quantity: "2 pairs", reason: "If needed" },
          { item: "Fresh batteries", quantity: "1 set", reason: "Headlamp refresh" },
          { item: "Salt tabs", quantity: "10", reason: "Don't neglect electrolytes" }
        ],
        priorityItems: ["Gels x6", "Extra layer"],
        notes: "No crew access - make this count"
      },
      {
        name: "Scott's Peak",
        mile: 78.2,
        expectedArrival: "23:54",
        timeOfDay: "night",
        weatherConditions: "Cold, approaching dawn",
        packingList: [
          { item: "Gels x4", quantity: "4", reason: "Final 22 miles" },
          { item: "Caffeine boost", quantity: "2", reason: "Sunrise energy" },
          { item: "Comfort food", quantity: "1", reason: "Treat for making it here" }
        ],
        priorityItems: ["Gels x4", "Caffeine boost"],
        notes: "If crew is here, this can be minimal"
      }
    ],
    generalPackingTips: [
      "Use clear ziplock bags labeled with station name and mile",
      "Pack priority items on TOP of bag for quick access",
      "Include a written note to yourself with key reminders",
      "Double-bag anything that could spill",
      "Add one 'treat' item per bag for motivation",
      "Check weather forecast 24 hours before and adjust"
    ],
    labelingSystem: "Use bright colored tape with station name and mile marker (e.g., 'SESSIONS 25.1'). Write your bib number on each bag. Organize bags at drop-off in order of the course.",
    dropOffInstructions: "Drop bags due at race check-in Friday evening. Bring all bags labeled and organized. You cannot access bags after drop-off until you reach that aid station. Make sure each bag is complete before drop-off."
  },
  nutritionTimeline: {
    timeline: [
      { mile: 0, time: "5:00 AM", timeElapsed: "0:00", calories: 0, sodium: 0, fluids: 16, foods: ["Pre-race: 400 cal breakfast 3hrs before"], notes: "Toast, banana, coffee" },
      { mile: 5, time: "6:40 AM", timeElapsed: "1:40", calories: 375, sodium: 300, fluids: 32, foods: ["2 Gels", "Sports drink"], notes: "Start fueling early - 225 cal/hr" },
      { mile: 10.8, time: "8:58 AM", timeElapsed: "3:58", calories: 520, sodium: 450, fluids: 40, foods: ["3 Gels", "Salt tabs x3", "Banana"], notes: "Francis Peak - keep calories up" },
      { mile: 15, time: "10:05 AM", timeElapsed: "5:05", calories: 250, sodium: 300, fluids: 20, foods: ["Bar", "Sports drink"], notes: "Quick fuel between stations" },
      { mile: 18.2, time: "10:45 AM", timeElapsed: "5:45", calories: 300, sodium: 400, fluids: 24, foods: ["Gel", "PB sandwich half", "Salt tabs x2"], notes: "Bountiful B crew stop" },
      { mile: 25.1, time: "12:49 PM", timeElapsed: "7:49", calories: 500, sodium: 600, fluids: 32, foods: ["Potatoes", "Broth", "2 Gels", "Pretzels"], notes: "Sessions - real food, big refuel" },
      { mile: 30, time: "2:10 PM", timeElapsed: "9:10", calories: 300, sodium: 400, fluids: 24, foods: ["Gel", "Sports drink", "Fig bars"], notes: "Hottest part of day - stay on top" },
      { mile: 39.8, time: "5:09 PM", timeElapsed: "12:09", calories: 700, sodium: 800, fluids: 40, foods: ["Soup", "Quesadilla", "2 Gels", "Cola"], notes: "Big Mountain - major meal" },
      { mile: 50.1, time: "7:49 PM", timeElapsed: "14:49", calories: 800, sodium: 900, fluids: 48, foods: ["Ramen", "PB&J", "2 Gels", "Coffee", "Potatoes"], notes: "Lamb's - biggest meal of race" },
      { mile: 60.2, time: "11:01 PM", timeElapsed: "18:01", calories: 700, sodium: 700, fluids: 40, foods: ["4 Gels", "Broth", "Salt tabs x4", "Candy"], notes: "Night fueling - easy to digest" },
      { mile: 70.1, time: "2:04 AM+1", timeElapsed: "21:04", calories: 700, sodium: 600, fluids: 40, foods: ["3 Gels", "Soup", "Grilled cheese half"], notes: "Desolation - stay fueled for final push" },
      { mile: 78.2, time: "4:54 AM+1", timeElapsed: "23:54", calories: 600, sodium: 500, fluids: 36, foods: ["2 Caffeine gels", "Pancake", "Fruit"], notes: "Scott's Peak - dawn energy boost" },
      { mile: 90.3, time: "8:14 AM+1", timeElapsed: "27:14", calories: 500, sodium: 400, fluids: 32, foods: ["2 Gels", "Sports drink", "Cookies"], notes: "Ant Knolls - final fuel push" },
      { mile: 100, time: "10:59 AM+1", timeElapsed: "29:59", calories: 0, sodium: 0, fluids: 0, foods: ["FINISH!"], notes: "You did it!" }
    ],
    summary: {
      totalCalories: 6245,
      caloriesPerHour: 209,
      totalSodium: 6350,
      sodiumPerHour: 212,
      totalFluids: 424,
      fluidsPerHour: 14
    },
    preRaceNutrition: "Night before: Pasta or rice with light protein, avoid fiber and fat. Morning: Toast with peanut butter and banana, coffee. 400 calories 3 hours before start. Sip 16oz fluids in final hour. Use bathroom before start.",
    hydrationStrategy: "Target 16-20oz per hour in early miles, adjust based on heat and sweat rate. Aim for light yellow urine at aid stations. Carry 20oz minimum at all times per race rules. Mix water and sports drink for flavor fatigue.",
    caffeineStrategy: "First caffeine at Big Mountain (~12 hours in). Use caffeine gels at night aid stations: Big Mountain, Lamb's, Desolation, Scott's. Max 100mg per dose, ~400mg total for night section. Stop caffeine after Scott's Peak.",
    stomachIssuesPrevention: [
      "Practice all race nutrition during training",
      "Start with easily digestible foods",
      "Don't overeat at aid stations—small amounts frequently",
      "Separate drinking from eating slightly",
      "If nausea hits: slow down, take salt, sip ginger ale",
      "Ginger chews as backup for GI distress"
    ],
    aidStationStrategy: "Don't try new foods on race day. Survey the station before grabbing food. Eat while standing/walking to keep moving. Fill bottles first, then eat while walking out. Thank the volunteers—it helps your mood!"
  },
  contingencyProtocols: {
    protocols: [
      {
        scenario: "GI Distress / Nausea",
        severity: "medium",
        warningSignals: ["Stomach cramping", "Urge to vomit", "Food aversion", "Bloating"],
        immediateActions: [
          "Slow pace by 30 seconds/mile immediately",
          "Switch to clear liquids only (water, broth)",
          "Take 2-3 salt tabs if not already taking",
          "Walk for 10-15 minutes to settle stomach",
          "Try ginger chew or flat cola at next aid"
        ],
        prevention: ["Don't gulp fluids", "Eat small amounts frequently", "Avoid high-fat foods", "Test all race nutrition in training"],
        whenToStop: "If you can't keep any fluids down for more than 30 minutes and you're showing signs of dehydration (confusion, dizziness, no sweat)"
      },
      {
        scenario: "Blisters / Hot Spots",
        severity: "low",
        warningSignals: ["Burning sensation", "Rubbing feeling", "Wet feet", "Pain that changes your gait"],
        immediateActions: [
          "Stop and address immediately—blisters only get worse",
          "Clean area with alcohol wipe",
          "Apply lubricant generously",
          "Cover with tape or blister bandage",
          "Change socks if wet"
        ],
        prevention: ["Break in shoes before race", "Apply lubricant to prone areas pre-race", "Change socks at halfway", "Keep feet dry"],
        whenToStop: "Only if infection signs appear (spreading redness, red streaks, fever) or if pain causes severe gait compensation that could lead to injury"
      },
      {
        scenario: "Falling Behind Cutoffs",
        severity: "high",
        warningSignals: ["Buffer drops below 1 hour", "Consistent slowing over multiple sections", "Missing nutrition", "Negative mental state"],
        immediateActions: [
          "Don't panic—assess the situation calmly",
          "Eat and drink—many slowdowns are fueling issues",
          "Calculate exact buffer to next cutoff",
          "Cut aid station time: in/out in 3 minutes",
          "Run the runnable sections—walk only steep climbs",
          "Focus on one aid station at a time"
        ],
        prevention: ["Start conservatively", "Bank time early", "Don't linger at aid stations", "Stay on top of nutrition"],
        whenToStop: "If you mathematically cannot make the next cutoff even with best-case pacing, or if trying to make cutoff puts you at injury risk"
      },
      {
        scenario: "Hypothermia",
        severity: "critical",
        warningSignals: ["Uncontrollable shivering", "Slurred speech", "Confusion", "Clumsiness", "Drowsiness"],
        immediateActions: [
          "Get to aid station immediately",
          "Put on all available layers",
          "Get out of wet clothes",
          "Drink hot fluids",
          "Stay at aid until warming up",
          "Alert medical if confusion persists"
        ],
        prevention: ["Carry required layers", "Put on layers BEFORE getting cold", "Keep moving", "Eat to fuel internal heat"],
        whenToStop: "If confusion or severe shivering persists after warming attempts. Hypothermia can be fatal—don't push through this."
      },
      {
        scenario: "Heat Exhaustion",
        severity: "high",
        warningSignals: ["Stopped sweating", "Headache", "Nausea", "Dizziness", "Rapid heartbeat", "Muscle cramps"],
        immediateActions: [
          "Slow down or stop immediately",
          "Get to shade",
          "Pour water on head, neck, wrists",
          "Drink electrolytes—lots of salt",
          "Loosen clothing",
          "Rest until heart rate drops"
        ],
        prevention: ["Pre-hydrate", "Take salt early and often", "Pour water on yourself at aid", "Wear light colors", "Slow down in heat"],
        whenToStop: "If you stop sweating and can't cool down, or if confusion sets in. Heat stroke is a medical emergency."
      },
      {
        scenario: "Injury (Ankle, Knee, Hip)",
        severity: "medium",
        warningSignals: ["Sharp pain (not normal soreness)", "Swelling visible", "Can't bear weight", "Pain that alters gait significantly"],
        immediateActions: [
          "Stop and assess—can you walk without limping?",
          "Try RICE if at aid station",
          "Tape for support if mild",
          "Take ibuprofen if not GI sensitive (race approved)",
          "Test for 5 minutes before continuing"
        ],
        prevention: ["Train on similar terrain", "Strengthen ankles pre-race", "Watch footing especially when tired", "Use poles on technical sections"],
        whenToStop: "If you cannot walk without significant limping. Compensating gait for 20+ miles will cause more injuries."
      }
    ],
    emergencyContacts: `Race Director: (801) 555-0100
Race Hotline: (801) 555-0101
Runner's Cell: (Your number)
Crew Chief: (Crew number)
Emergency Services: 911`,
    dnfDecisionFramework: "Ask yourself: Is this a low point or an actual crisis? Low points pass—eat, drink, walk for 15 minutes, then reassess. Actual crises (medical, severe injury, cutoff math) require stopping. Never DNF in the dark—wait for sunrise. Never DNF at an aid station—walk out and reassess on the trail. If in doubt, keep moving.",
    raceHotlineInfo: "The race hotline is staffed 24/7 during the event. Call for: runner status updates, crew logistics questions, weather alerts, or medical questions. They can also connect you with aid station captains."
  },
  mentalStrategy: {
    raceDayMindset: "You've trained 350+ hours for this day. Trust that training. Your job is not to run 100 miles—it's to run to the next aid station. Then the next. 100 miles is overwhelming; 10 segments is manageable. You will have low points—they are part of the race, not a sign you should quit. The finish line is inevitable if you keep moving forward.",
    mantras: [
      {
        mantra: "One aid station at a time",
        useCase: "When the distance feels overwhelming",
        explanation: "100 miles is abstract. 6 miles to the next stop is concrete. Break it down."
      },
      {
        mantra: "This will pass",
        useCase: "During low points, pain, or doubt",
        explanation: "Every low point in training passed. This one will too. Keep moving."
      },
      {
        mantra: "I am built for this",
        useCase: "When you're deep in the pain cave",
        explanation: "You chose this race. You did the training. You belong here. Act like it."
      },
      {
        mantra: "Relentless forward progress",
        useCase: "When walking feels like giving up",
        explanation: "Walking is not quitting. Walking is smart racing. Keep moving forward."
      },
      {
        mantra: "Earn your finish",
        useCase: "In the final 20 miles",
        explanation: "No one gives you a finish. You take it. Every step is earning it."
      }
    ],
    toughSections: [
      {
        sectionName: "Francis Peak Climb",
        miles: "5-10.8",
        mentalChallenge: "Early doubt: 'If I'm hurting now, how will I finish?'",
        strategies: [
          "Remind yourself: everyone hurts on this climb",
          "Focus on breathing rhythm, not the distance",
          "This climb does not predict your race",
          "Bank time here by being efficient, not fast"
        ],
        mantras: ["This is the wake-up call", "First checkpoint, then we talk"],
        focusPoints: ["Breathing pattern", "Foot placement", "Eating schedule"]
      },
      {
        sectionName: "Sessions to Swallow Ridge",
        miles: "25-34",
        mentalChallenge: "Long exposed section, technical footing, heat of day",
        strategies: [
          "Stay present—don't think about miles remaining",
          "Count steps in sets of 100 to stay focused",
          "Use the views as a reward, not a distraction",
          "This is where you get to RUN—enjoy it"
        ],
        mantras: ["Run the ridge", "I trained for technical"],
        focusPoints: ["Footing", "Heat management", "Staying fueled"]
      },
      {
        sectionName: "Night Section (50-78)",
        miles: "50-78",
        mentalChallenge: "Fatigue, darkness, loneliness, sleepiness",
        strategies: [
          "Caffeine at strategic points (Big Mountain, Lamb's)",
          "Talk to people at aid stations—human connection helps",
          "Focus on headlamp beam, not the darkness",
          "Count down to sunrise, not the finish",
          "This is where your race is won"
        ],
        mantras: ["Sunrise is coming", "Night is my advantage"],
        focusPoints: ["Caffeine timing", "Keeping warm", "Not stopping"]
      },
      {
        sectionName: "Scott's Peak Final Climb",
        miles: "75-78",
        mentalChallenge: "Last major climb when completely depleted",
        strategies: [
          "Break it into 0.5 mile chunks",
          "Celebrate every false summit",
          "Remember: this is the LAST big climb",
          "Think about who you're running for",
          "You've done this climb in training"
        ],
        mantras: ["Earn your finish", "Last climb, then it's over"],
        focusPoints: ["Consistent effort", "Fueling through", "Mental imagery"]
      }
    ],
    darkMomentProtocol: "When you hit rock bottom (and you will): 1) Sit down at the next safe spot. 2) Eat something—anything. 3) Drink 12oz fluids. 4) Give it 10 minutes. 5) Ask: Is this a physical problem or mental? Physical: address it specifically. Mental: it will pass, get moving. 6) Walk for 15 minutes after restarting. 7) Reassess at the next aid station. Most dark moments pass within 30-45 minutes if you keep moving.",
    motivationalAnchors: [
      "Your family will be at the finish line",
      "You made a commitment to yourself 6 months ago",
      "Everyone who believed in you when you signed up",
      "Proving that you can do hard things",
      "The community of runners who trained with you",
      "Future you will thank present you for not quitting"
    ],
    celebrationMilestones: [
      { mile: 25, celebration: "Quarter done! Strong start." },
      { mile: 50, celebration: "HALFWAY! Night crew, let's go." },
      { mile: 75, celebration: "Buckle is in sight. 25 to glory." },
      { mile: 90, celebration: "Single digits! You're doing it!" },
      { mile: 100, celebration: "YOU ARE A 100-MILE FINISHER!" }
    ],
    finishLineVisualization: "Picture this: The sun is up. You turn the final corner at Soldier Hollow. You hear the announcer call your name. The finish banner is 100 meters away. Your crew is screaming. Every step is lighter now. You cross the line, and someone puts a medal around your neck. You did what most people can't even imagine. You are a hundred-mile finisher. This is the moment you trained for. See it. Feel it. It's waiting for you."
  }
};

const sampleQuestionnaire: QuestionnaireData = {
  raceName: "Wasatch Front 100",
  raceDate: new Date("2025-09-05"),
  goalFinishTime: "29:00",
  firstName: "Alex",
  email: "alex@example.com",
  tier: "custom" as const,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  try {
    // If format=html, return the HTML for debugging
    if (format === 'html') {
      const html = getGuideHTML(sampleGuideData, sampleQuestionnaire);
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html',
        }
      });
    }

    // Generate PDF
    const pdfBuffer = await generateGuidePDF(sampleGuideData, sampleQuestionnaire);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="paceline-test-guide.pdf"'
      }
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    return NextResponse.json(
      { error: 'PDF generation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Mock data for development when backend is unavailable

export const mockStateData = {
  states: [
    {
      state_name: "Delhi",
      avg_sop_score: 0.75,
      total_calls: 450,
      emergency_calls: 12,
      top_issues: ["Long wait time", "Payment issues", "Delivery delays"],
      cities: ["New Delhi", "Gurgaon", "Noida"]
    },
    {
      state_name: "Maharashtra",
      avg_sop_score: 0.68,
      total_calls: 820,
      emergency_calls: 25,
      top_issues: ["Product quality", "Service delays", "Communication gap"],
      cities: ["Mumbai", "Pune", "Nagpur"]
    },
    {
      state_name: "Karnataka",
      avg_sop_score: 0.82,
      total_calls: 620,
      emergency_calls: 8,
      top_issues: ["Technical issues", "Billing errors"],
      cities: ["Bangalore", "Mysore", "Hubli"]
    },
    {
      state_name: "Tamil Nadu",
      avg_sop_score: 0.55,
      total_calls: 540,
      emergency_calls: 32,
      top_issues: ["Language barrier", "Poor service", "Long resolution time"],
      cities: ["Chennai", "Coimbatore", "Madurai"]
    },
    {
      state_name: "Uttar Pradesh",
      avg_sop_score: 0.42,
      total_calls: 720,
      emergency_calls: 45,
      top_issues: ["Rude behavior", "Unresolved complaints", "Poor follow-up"],
      cities: ["Lucknow", "Kanpur", "Agra"]
    },
    {
      state_name: "Gujarat",
      avg_sop_score: 0.78,
      total_calls: 380,
      emergency_calls: 6,
      top_issues: ["Documentation issues", "Delivery timing"],
      cities: ["Ahmedabad", "Surat", "Vadodara"]
    },
    {
      state_name: "Rajasthan",
      avg_sop_score: 0.12,
      total_calls: 290,
      emergency_calls: 52,
      top_issues: ["Agent training needed", "System errors", "Poor communication"],
      cities: ["Jaipur", "Jodhpur", "Udaipur"]
    },
    {
      state_name: "West Bengal",
      avg_sop_score: 0.65,
      total_calls: 470,
      emergency_calls: 18,
      top_issues: ["Booking problems", "Service quality"],
      cities: ["Kolkata", "Siliguri", "Durgapur"]
    }
  ]
};

export const mockCityData = {
  Gurgaon: {
    city_name: "Gurgaon",
    total_calls: 250,
    avg_sop_score: 0.72,
    avg_sentiment: 0.65,
    emergency_calls: 8,
    top_issues: ["Payment gateway issues", "Delivery slot unavailable", "Customer rude behavior"],
    coaching_insights: [
      "Agents need better training on payment troubleshooting",
      "Improve first-call resolution rate",
      "Enhance empathy in communication"
    ],
    agents: [
      { agent_name: "Rahul Kumar", total_calls: 45, avg_sop_score: 0.85, avg_sentiment: 0.78 },
      { agent_name: "Priya Sharma", total_calls: 52, avg_sop_score: 0.68, avg_sentiment: 0.62 },
      { agent_name: "Amit Singh", total_calls: 38, avg_sop_score: 0.92, avg_sentiment: 0.88 }
    ]
  },
  Mumbai: {
    city_name: "Mumbai",
    total_calls: 380,
    avg_sop_score: 0.65,
    avg_sentiment: 0.58,
    emergency_calls: 15,
    top_issues: ["Traffic delays", "Product damage", "Refund delays"],
    coaching_insights: [
      "Better handling of escalations needed",
      "Improve product knowledge",
      "Reduce call handling time"
    ],
    agents: [
      { agent_name: "Sneha Patel", total_calls: 68, avg_sop_score: 0.75, avg_sentiment: 0.70 },
      { agent_name: "Rohan Desai", total_calls: 55, avg_sop_score: 0.58, avg_sentiment: 0.52 }
    ]
  }
};

export const mockLeaderboard = {
  agents: [
    {
      agent_name: "Amit Singh",
      overall_score: 0.92,
      total_calls: 156,
      emergency_calls: 2,
      avg_sentiment: 0.88,
      sop_score: 0.95
    },
    {
      agent_name: "Priya Sharma",
      overall_score: 0.85,
      total_calls: 203,
      emergency_calls: 5,
      avg_sentiment: 0.82,
      sop_score: 0.87
    },
    {
      agent_name: "Rahul Kumar",
      overall_score: 0.78,
      total_calls: 178,
      emergency_calls: 8,
      avg_sentiment: 0.75,
      sop_score: 0.80
    },
    {
      agent_name: "Sneha Patel",
      overall_score: 0.72,
      total_calls: 145,
      emergency_calls: 12,
      avg_sentiment: 0.68,
      sop_score: 0.75
    },
    {
      agent_name: "Rohan Desai",
      overall_score: 0.65,
      total_calls: 189,
      emergency_calls: 18,
      avg_sentiment: 0.58,
      sop_score: 0.68
    }
  ]
};

export const mockAgentPerformance = {
  "Amit Singh": {
    agent_name: "Amit Singh",
    overall_score: 0.92,
    total_calls: 156,
    sop_score: 0.95,
    avg_sentiment: 0.88,
    emergency_calls: 2,
    score_trend: 0.05,
    performance_trend: [
      { date: "2026-01-25", score: 0.88 },
      { date: "2026-01-26", score: 0.90 },
      { date: "2026-01-27", score: 0.89 },
      { date: "2026-01-28", score: 0.92 },
      { date: "2026-01-29", score: 0.93 },
      { date: "2026-01-30", score: 0.94 },
      { date: "2026-01-31", score: 0.92 }
    ],
    call_distribution: [
      { category: "Resolved", count: 142 },
      { category: "Escalated", count: 10 },
      { category: "Pending", count: 4 }
    ],
    coaching_insights: [
      "Excellent adherence to SOP guidelines",
      "Strong customer empathy and communication",
      "Quick resolution of technical issues"
    ]
  },
  "Priya Sharma": {
    agent_name: "Priya Sharma",
    overall_score: 0.68,
    total_calls: 203,
    sop_score: 0.65,
    avg_sentiment: 0.62,
    emergency_calls: 15,
    score_trend: -0.08,
    performance_trend: [
      { date: "2026-01-25", score: 0.75 },
      { date: "2026-01-26", score: 0.72 },
      { date: "2026-01-27", score: 0.70 },
      { date: "2026-01-28", score: 0.68 },
      { date: "2026-01-29", score: 0.65 },
      { date: "2026-01-30", score: 0.67 },
      { date: "2026-01-31", score: 0.68 }
    ],
    call_distribution: [
      { category: "Resolved", count: 165 },
      { category: "Escalated", count: 28 },
      { category: "Pending", count: 10 }
    ],
    coaching_insights: [
      "Needs improvement in handling angry customers",
      "Should follow SOP more strictly",
      "Improve product knowledge on payment issues"
    ]
  }
};

export const mockWorstCall = {
  "Amit Singh": {
    agent_name: "Amit Singh",
    call_id: "CALL_20260130_001",
    call_date: "2026-01-30",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    transcript: [
      { start: 0, end: 5, text: "Hello, this is Amit from Battery Smart. How may I help you?", is_critical: false },
      { start: 6, end: 12, text: "Yes, I have been waiting for my battery for 3 hours!", is_critical: true },
      { start: 13, end: 18, text: "I understand your concern. Let me check the status.", is_critical: false },
      { start: 19, end: 25, text: "This is ridiculous! I need it urgently!", is_critical: true },
      { start: 26, end: 32, text: "I apologize for the delay. I will escalate this immediately.", is_critical: false }
    ],
    sop_checks: [
      { name: "Greeting", passed: true, actual: "Hello, this is Amit", expected: null },
      { name: "Empathy Statement", passed: false, actual: "I understand your concern", expected: "I sincerely apologize for the inconvenience caused" },
      { name: "Solution Offered", passed: true, actual: "I will escalate this", expected: null },
      { name: "Closing", passed: true, actual: "Thank you for calling", expected: null }
    ],
    ai_suggestions: [
      "Use stronger empathy statements when dealing with frustrated customers",
      "Provide specific timeline instead of vague promises",
      "Offer compensation or alternative solution proactively"
    ]
  }
};

export const mockEmergencyCalls = {
  calls: [
    {
      customer_number: "+91-9876543210",
      agent_name: "Priya Sharma",
      call_date: "2026-02-01T08:30:00",
      severity: "critical",
      critical_snippet: "I'm going to file a complaint against your company!",
      audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      transcript: [
        { start: 0, end: 5, text: "Battery Smart customer service, this is Priya.", is_critical: false },
        { start: 6, end: 12, text: "Your service is pathetic! Nobody called me back!", is_critical: true, ai_suggestion: "I sincerely apologize for missing your follow-up. Let me personally ensure this is resolved right away." },
        { start: 13, end: 18, text: "Let me check your complaint history.", is_critical: false },
        { start: 19, end: 25, text: "I'm going to file a complaint against your company!", is_critical: true, ai_suggestion: "I completely understand your frustration. I'm escalating this to my supervisor immediately, and we'll have a resolution within 2 hours." }
      ]
    },
    {
      customer_number: "+91-9123456789",
      agent_name: "Rohan Desai",
      call_date: "2026-02-01T09:15:00",
      severity: "high",
      critical_snippet: "This is the third time I'm calling about the same issue!",
      audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      transcript: [
        { start: 0, end: 5, text: "Good morning, Battery Smart support.", is_critical: false },
        { start: 6, end: 12, text: "This is the third time I'm calling about the same issue!", is_critical: true, ai_suggestion: "I sincerely apologize that you've had to call multiple times. I'm going to personally own this issue and ensure it's resolved today." }
      ]
    },
    {
      customer_number: "+91-9876512345",
      agent_name: "Amit Singh",
      call_date: "2026-02-01T10:00:00",
      severity: "medium",
      critical_snippet: "I'm not satisfied with your response.",
      audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      transcript: [
        { start: 0, end: 8, text: "I'm not satisfied with your response.", is_critical: true, ai_suggestion: "I understand this isn't the answer you were hoping for. Let me explore alternative solutions with you." }
      ]
    }
  ]
};

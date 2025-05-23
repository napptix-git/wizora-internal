
import { Template } from "@/components/templates/TemplateCard"

export const templates: Template[] = [
  {
    id: 1,
    name: "Scratch Card",
    category: "Interactive",
    preview: "🎴",
    description: "Engaging scratch-to-reveal mechanics",
    previewImage: "scratchcard-preview.jpg"
  },
  {
    id: 2,
    name: "Carousel",
    category: "Display",
    preview: "🎠", 
    description: "Swipeable image carousel",
    previewImage: "carousel-preview.jpg"
  },
  {
    id: 3,
    name: "Carousel with Video",
    category: "Video",
    preview: "📹",
    description: "Video-enhanced carousel experience",
    previewImage: "carousel-video-preview.jpg"
  },
  {
    id: 4,
    name: "Endless Runner",
    category: "Game",
    preview: "🏃",
    description: "Infinite scrolling game mechanics",
    previewImage: "endless-runner-preview.jpg"
  },
  {
    id: 5,
    name: "Catch and Collect",
    category: "Game",
    preview: "🎯",
    description: "Interactive collection game",
    featured: true,
    previewImage: "catch-collect-preview.jpg"
  },
  {
    id: 6,
    name: "Pac-Man Style",
    category: "Game",
    preview: "👾",
    description: "Classic arcade-style gameplay"
  },
  {
    id: 7,
    name: "Branched Carousel",
    category: "Interactive",
    preview: "🌳",
    description: "Multi-path interactive experience"
  },
  {
    id: 8,
    name: "Custom Game",
    category: "Custom",
    preview: "🎮",
    description: "Build your own game mechanics"
  }
]

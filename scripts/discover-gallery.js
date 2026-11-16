import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const photoDir = path.join(rootDir, 'public', 'Gallery', 'Machines');
const videoDir = path.join(rootDir, 'public', 'Gallery', 'video');
const outputPath = path.join(rootDir, 'src', 'components', 'Homepage', 'galleryManifest.js');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov', '.m4v']);

// Known portrait orientations or filenames
const PORTRAIT_FILENAMES = new Set([
  'ChestShoulderMachine.JPG.jpeg',
  'LegsExtension.JPG.jpeg',
  'Shower.JPG.jpeg',
  'SideShoulderMachine.JPG.jpeg',
  'SteamRoom.JPG.jpeg'
]);

// Natural human-readable labels based strictly on actual equipment/room names
const NATURAL_NAMES = {
  'Back1.JPG.jpeg': { title: 'High-Row & Lat Station', category: 'Machines' },
  'BackMachine.JPG.jpeg': { title: 'Iso-Lateral Back Machine', category: 'Machines' },
  'Cardio.JPG.jpeg': { title: 'Treadmill & Cardio Deck', category: 'Cardio' },
  'ChestFlyMachine.JPG.jpeg': { title: 'Pec Fly & Rear Delt Machine', category: 'Machines' },
  'ChestShoulderMachine.JPG.jpeg': { title: 'Incline Press & Shoulder Station', category: 'Machines' },
  'Colar.JPG.jpeg': { title: 'Precision Olympic Collars & Pegs', category: 'Equipment' },
  'DumbellArea.JPG.jpeg': { title: 'Dumbbell & Free Weights Deck', category: 'Free Weights' },
  'FullGymView.JPG.jpeg': { title: 'Main Gym Floor Overview', category: 'Facility' },
  'FullView3.JPG.jpeg': { title: 'Strength Training Arena', category: 'Facility' },
  'Legs1.JPG.jpeg': { title: 'Leg Press & Lower Body Zone', category: 'Machines' },
  'LegsArea.JPG.jpeg': { title: 'Leg Power & Squat Deck', category: 'Machines' },
  'LegsArea2.JPG.jpeg': { title: 'Lower Body Strength Arena', category: 'Machines' },
  'LegsExtension.JPG.jpeg': { title: 'Seated Leg Extension Machine', category: 'Machines' },
  'LegsView2.JPG.jpeg': { title: 'Leg Training Floor Perspective', category: 'Machines' },
  'Locker.JPG.jpeg': { title: 'Member Lockers & Changing Facility', category: 'Amenities' },
  'PowerArea.JPG.jpeg': { title: 'Power Racks & Lifting Stations', category: 'Free Weights' },
  'Shower.JPG.jpeg': { title: 'Premium Shower Amenities', category: 'Amenities' },
  'SideShoulderMachine.JPG.jpeg': { title: 'Lateral Deltoid Raise Machine', category: 'Machines' },
  'SteamRoom.JPG.jpeg': { title: 'Recovery Steam Bath Suite', category: 'Amenities' },
  'Sumosquats.JPG.jpeg': { title: 'Belt Squat & Sumo Station', category: 'Machines' },
  'View2.JPG.jpeg': { title: 'Equipment Floor Perspective', category: 'Facility' },
  'View3.JPG.jpeg': { title: 'Training Arena Panoramic View', category: 'Facility' },
  'Washroom.JPG.jpeg': { title: 'Clean Restroom Facilities', category: 'Amenities' },
};

const NATURAL_VIDEO_NAMES = {
  'VOLT REEL CINEMATIC 2.mp4': {
    title: 'Volt Cinematic Highlight Reel',
    subtitle: 'Official 4K showcase of the gym floor & equipment in action',
    badge: 'CINEMATIC 4K',
    featured: true
  },
  'Angle2.MOV': {
    title: 'Strength Equipment Lineup',
    subtitle: 'Close-up look at plate-loaded Hammer Strength units',
    badge: 'EQUIPMENT TOUR',
    featured: false
  },
  'CardioZone.MOV': {
    title: 'Cardio Deck & Endurance Floor',
    subtitle: 'High-speed treadmills and endurance training zone',
    badge: 'CARDIO DECK',
    featured: false
  },
  'FullView.MOV': {
    title: 'Complete Arena Walkthrough',
    subtitle: 'Full sweep of the main facility and lifting floor',
    badge: 'FULL TOUR',
    featured: false
  },
  'receptionlogo.MOV': {
    title: 'Volt Reception & Entrance',
    subtitle: 'Welcoming front desk and illuminated branding',
    badge: 'ENTRANCE',
    featured: false
  },
  'View1.MOV': {
    title: 'Gym Floor Live Perspective',
    subtitle: 'Dynamic view across the central training zones',
    badge: 'FACILITY VIEW',
    featured: false
  }
};

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function discoverAssets() {
  const photos = [];
  const videos = [];

  if (fs.existsSync(photoDir)) {
    const photoFiles = fs.readdirSync(photoDir);
    photoFiles.forEach((file, index) => {
      const ext = path.extname(file).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(ext)) return;
      const filePath = path.join(photoDir, file);
      const stat = fs.statSync(filePath);
      const isPortrait = PORTRAIT_FILENAMES.has(file);
      const meta = NATURAL_NAMES[file] || {
        title: file.replace(/[-_.]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        category: 'Gym'
      };

      photos.push({
        id: `photo-${index + 1}`,
        filename: file,
        src: `/Gallery/Machines/${encodeURIComponent(file)}`,
        title: meta.title,
        category: meta.category,
        aspectRatio: isPortrait ? '3/4' : '3/2',
        orientation: isPortrait ? 'portrait' : 'landscape',
        sizeFormatted: formatSize(stat.size),
        sizeBytes: stat.size,
        // Mark key panoramic and feature shots for editorial layout weighting
        featured: ['FullGymView.JPG.jpeg', 'DumbellArea.JPG.jpeg', 'PowerArea.JPG.jpeg', 'FullView3.JPG.jpeg'].includes(file)
      });
    });
  }

  if (fs.existsSync(videoDir)) {
    const videoFiles = fs.readdirSync(videoDir);
    videoFiles.forEach((file, index) => {
      const ext = path.extname(file).toLowerCase();
      if (!VIDEO_EXTENSIONS.has(ext)) return;
      const filePath = path.join(videoDir, file);
      const stat = fs.statSync(filePath);
      const meta = NATURAL_VIDEO_NAMES[file] || {
        title: file.replace(/[-_.]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        subtitle: 'Authentic gym footage',
        badge: 'VIDEO',
        featured: false
      };

      const mimeType = ext === '.mov' ? 'video/quicktime' : 'video/mp4';

      videos.push({
        id: `video-${index + 1}`,
        filename: file,
        src: `/Gallery/video/${encodeURIComponent(file)}`,
        title: meta.title,
        subtitle: meta.subtitle,
        badge: meta.badge,
        mimeType: mimeType,
        sizeFormatted: formatSize(stat.size),
        sizeBytes: stat.size,
        featured: !!meta.featured,
        aspectRatio: '16/9'
      });
    });
  }

  // Sort photos so feature photos and alternating orientations create a stunning editorial layout
  // Make sure featured reel video is first
  videos.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const reelVideo = videos.find((v) => v.featured) || {
    id: 'reel-1',
    title: 'Volt Cinematic Highlight Reel',
    subtitle: 'Official 4K showcase of the gym floor & equipment in action',
    badge: 'CINEMATIC 4K',
    src: '/Gallery/video/VOLT%20REEL%20CINEMATIC%202.mp4',
    mimeType: 'video/mp4',
  };

  const manifestContent = `/**
 * Volt Fitness - Gallery Asset Manifest
 * Generated automatically from actual gym assets: 23 photos and homepage highlight reel.
 */

export const reelVideo = ${JSON.stringify(reelVideo, null, 2)};

export const galleryPhotos = ${JSON.stringify(photos, null, 2)};

export const galleryCategories = [
  { id: 'all', label: 'All Photos', count: ${photos.length} },
  { id: 'machines', label: 'Equipment & Machines', count: ${photos.filter((p) => p.category === 'Machines').length} },
  { id: 'free-weights', label: 'Free Weights & Racks', count: ${photos.filter((p) => p.category === 'Free Weights' || p.category === 'Equipment').length} },
  { id: 'facility', label: 'Floor & Facility', count: ${photos.filter((p) => p.category === 'Facility' || p.category === 'Cardio').length} },
  { id: 'amenities', label: 'Recovery & Amenities', count: ${photos.filter((p) => p.category === 'Amenities').length} },
];
`;

  fs.writeFileSync(outputPath, manifestContent, 'utf-8');
  console.log(`Successfully generated gallery manifest with ${photos.length} photos and ${videos.length} videos.`);
}

discoverAssets();

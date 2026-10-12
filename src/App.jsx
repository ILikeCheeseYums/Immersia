import { useState } from 'react';
import StreetViewer from './components/StreetViewer';
import { parseItem } from './utils/graph';
import FeatureCard from './components/FeatureCard';
import { useDropzone } from 'react-dropzone';

export default function App() {
  const [isViewing, setIsViewing] = useState(false);
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    const newImages = acceptedFiles.map(file => {
      const url = URL.createObjectURL(file);
      const parsed = parseItem(file.name);
      parsed.image = url;
      parsed.file = file;
      return parsed;
    });
    
    setImages(newImages);
    setIsViewing(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }
  });

  // Render the standalone Viewer Tool
  if (isViewing) {
    return <StreetViewer images={images} onExit={() => setIsViewing(false)} />;
  }

  // Render the Landing / Home Page
  return (
    <div {...getRootProps()} className={`min-h-screen bg-[#0b0c0e] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden transition-colors ${isDragActive ? 'bg-[#1a1d24]' : ''}`}>
      <input {...getInputProps()} />
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#20232a 1px, transparent 1px), linear-gradient(90deg, #20232a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {isDragActive && (
        <div className="absolute inset-0 z-50 bg-[#1a73e8]/20 backdrop-blur-sm border-4 border-dashed border-[#1a73e8] flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Drop images here to launch!</h2>
        </div>
      )}

      <div className="max-w-4xl text-center space-y-8 z-10 pointer-events-auto">
        <div className="flex justify-center">
            <img src="./symbol.png" alt="Compass" className="square h-[20vh] pointer-events-none" />
        </div>

        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8ab4f8] to-[#1a73e8]">
          Immersia 3D Engine
        </h1>
        
        <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
        Stop imagining the place, Immerse in the experience. 
        A photo-based virtual tour builder for real-world experiences
        <br />~By Team Get Init
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 pb-12 text-left">
          <FeatureCard
            iconSrc="./icons/image.svg"
            title="1. Drop Images"
            description="Drag and drop your 360° panoramas or flat images right here. Use `pano` in the name for 360 views."
            hoverBorderColor="hover:border-blue-500/30"
          />
          <FeatureCard
            iconSrc="./icons/map.svg"
            title="2. Auto-Graph"
            description="The engine automatically builds a walkable spatial map using {Step}{Branch}-{Turn} nomenclature."
            hoverBorderColor="hover:border-green-500/30"
          />
          <FeatureCard
            iconSrc="./icons/layers.svg"
            title="3. Immediate Play"
            description="The viewer instantly launches with your files mapped in 3D space, entirely client-side."
            hoverBorderColor="hover:border-purple-500/30"
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center pointer-events-auto">
          <button 
            type="button"
            className="group relative px-8 py-3.5 bg-[#1a73e8] hover:bg-[#1557b0] transition-all rounded-full font-bold text-lg cursor-pointer shadow-lg"
          >
            <span className="flex items-center gap-3">
              <img src="./icons/upload-cloud.svg" alt="" className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300 pointer-events-none" />
              Select Images or Drop Here
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

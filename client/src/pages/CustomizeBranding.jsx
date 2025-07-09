import React, { useState } from 'react';

function CustomizeBranding() {
  const [brandName, setBrandName] = useState('');
  const [logo, setLogo] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [secondaryColor, setSecondaryColor] = useState('#3B82F6');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [footerText, setFooterText] = useState('');

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-700">Customize Branding</h1>
      <form className="space-y-8">
        <div>
          <label className="block font-semibold mb-2 text-gray-700" htmlFor="brandName">Brand Name</label>
          <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your brand name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700" htmlFor="logo">Logo Upload</label>
          <input
            id="logo"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full"
          />
          {logo && (
            <img src={logo} alt="Logo Preview" className="mt-4 h-24 object-contain rounded-md border border-gray-300 shadow" />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block font-semibold mb-2 text-gray-700" htmlFor="primaryColor">Primary Color</label>
            <input
              id="primaryColor"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-full h-12 p-0 border-0 rounded-md shadow-inner"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700" htmlFor="secondaryColor">Secondary Color</label>
            <input
              id="secondaryColor"
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="w-full h-12 p-0 border-0 rounded-md shadow-inner"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700" htmlFor="fontFamily">Font Family</label>
          <select
            id="fontFamily"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="'Georgia', serif">Georgia</option>
            <option value="'Verdana', sans-serif">Verdana</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700" htmlFor="footerText">Footer Text</label>
          <textarea
            id="footerText"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            placeholder="Enter footer text"
          />
        </div>
      </form>

      <div className="mt-12 p-8 border rounded-lg shadow-lg" style={{ fontFamily }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>{brandName || 'Brand Name Preview'}</h2>
        {logo && <img src={logo} alt="Logo Preview" className="h-20 mb-6 object-contain rounded-md border border-gray-300 shadow" />}
        <p className="text-lg" style={{ color: secondaryColor }}>{footerText || 'Footer text preview...'}</p>
      </div>
    </div>
  );
}

export default CustomizeBranding;

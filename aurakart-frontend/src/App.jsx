// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mobiles from './pages/Mobiles';
import Fashion from './pages/Fashion';
import Electronics from './pages/Electronics';
import Gaming from './pages/Gaming';
import Watches from './pages/Watches';
import Sports from './pages/Sports';
import Furniture from './pages/Furniture';
import HomeCategory from './pages/HomeCategory';
import BeautyCategory from './pages/BeautyCategory';
import GroceryCategory from './pages/GroceryCategory';
import AuraPhoneProMax from './pages/AuraPhoneProMax';
import AuraUltra24 from './pages/AuraUltra24';
import AuraFlipFoldable from './pages/AuraFlipFoldable';
import AuraLiteSE from './pages/AuraLiteSE';
import AuraROGPerformance from './pages/AuraROGPerformance';
import AuraNeoXPerformance from './pages/AuraNeoXPerformance';
import AuraSneakersFuture from './pages/AuraSneakersFuture';
import AuraStealthTechParka from './pages/AuraStealthTechParka';
import AuraEssentialHoodie from './pages/AuraEssentialHoodie';
import AuraLuxuryTimepiece from './pages/AuraLuxuryTimepiece';
import AuraUrbanCommuter from './pages/AuraUrbanCommuter';
import AuraBioLuminousSerum from './pages/AuraBioLuminousSerum';
import AuraRenewalCream from './pages/AuraRenewalCream';
import AuraClayMask from './pages/AuraClayMask';
import AuraGoldenElixir from './pages/AuraGoldenElixir';
import AuraEnzymeCleanser from './pages/AuraEnzymeCleanser';
import AuraPlayConsoleX from './pages/AuraPlayConsoleX';
import AuraOmegaBattleStation from './pages/AuraOmegaBattleStation';
import AuraMechXKeyboard from './pages/AuraMechXKeyboard';
import AuraGlideZeroMouse from './pages/AuraGlideZeroMouse';
import AuraAtmosWireless from './pages/AuraAtmosWireless';
import AuraHeritageAutomatic from './pages/AuraHeritageAutomatic';
import AuraDiverPro from './pages/AuraDiverPro';
import AuraHorizonSmartwatch from './pages/AuraHorizonSmartwatch';
import AuraLunarMinimalist from './pages/AuraLunarMinimalist';
import AuraExecutiveGold from './pages/AuraExecutiveGold';
import AuraSpeedProBike from './pages/AuraSpeedProBike';
import AuraPeakSmartGym from './pages/AuraPeakSmartGym';
import AuraHydroTreadmill from './pages/AuraHydroTreadmill';
import AuraSportWatch from './pages/AuraSportWatch';
import AuraFlexWeights from './pages/AuraFlexWeights';
import AuraCloudSofa from './pages/AuraCloudSofa';
import AuraLumosDesk from './pages/AuraLumosDesk';
import AuraErgoChair from './pages/AuraErgoChair';
import AuraSmartBed from './pages/AuraSmartBed';
import AuraFloatingLamp from './pages/AuraFloatingLamp';
import AuraSoundPro from './pages/AuraSoundPro';
import AuraBookPro16 from './pages/AuraBookPro16';
import AuraSnapX1 from './pages/AuraSnapX1';
import AuraVisionCurved from './pages/AuraVisionCurved';
import AuraSkyGuardian from './pages/AuraSkyGuardian';
import AuraTabUltra from './pages/AuraTabUltra';
import Deals from './pages/Deals';
import Collections from './pages/Collections';
import AudioExperience from './pages/AudioExperience';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import ReturnsCentre from './pages/ReturnsCentre';
import HelpSupport from './pages/HelpSupport';
import GiftCards from './pages/GiftCards';
import PressReleases from './pages/PressReleases';
import Sustainability from './pages/Sustainability';
import SmartTechWrist from './pages/SmartTechWrist';
import UrbanStreetwear from './pages/UrbanStreetwear';
import UnleashUltimatePower from './pages/UnleashUltimatePower';
import StepIntoFuture from './pages/StepIntoFuture';
import PushYourLimits from './pages/PushYourLimits';
import UpgradeSpace from './pages/UpgradeSpace';
import AdminStats from './pages/AdminStats';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import CartDrawer from './components/CartDrawer';
import LocationModal from './components/LocationModal';
import AuthModal from './components/AuthModal';
import SmoothScroll from './components/SmoothScroll';
import DemoDisclaimer from './components/DemoDisclaimer';
import { Toaster } from 'react-hot-toast';

function App() {
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  return (
    <AuthProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      
      {!hasAcceptedDisclaimer && (
        <DemoDisclaimer onAccept={() => setHasAcceptedDisclaimer(true)} />
      )}

      {hasAcceptedDisclaimer && (
        <LocationProvider>
          <CartProvider>
            <Router>
              <SmoothScroll>
                <CartDrawer />
                <LocationModal />
                <AuthModal />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/category/mobiles" element={<Mobiles />} />
                  <Route path="/category/fashion" element={<Fashion />} />
                  <Route path="/category/electronics" element={<Electronics />} />
                  <Route path="/category/gaming" element={<Gaming />} />
                  <Route path="/category/watches" element={<Watches />} />
                  <Route path="/category/sports" element={<Sports />} />
                  <Route path="/category/furniture" element={<Furniture />} />
                  <Route path="/category/home" element={<HomeCategory />} />
                  <Route path="/category/beauty" element={<BeautyCategory />} />
                  <Route path="/category/grocery" element={<GroceryCategory />} />
                  <Route path="/product/phone-pro-1" element={<AuraPhoneProMax />} />
                  <Route path="/product/phone-ultra-1" element={<AuraUltra24 />} />
                  <Route path="/product/phone-flip-1" element={<AuraFlipFoldable />} />
                  <Route path="/product/phone-lite-1" element={<AuraLiteSE />} />
                  <Route path="/product/phone-gaming-1" element={<AuraROGPerformance />} />
                  <Route path="/product/phone-neo-1" element={<AuraNeoXPerformance />} />
                  <Route path="/product/sneakers-future-1" element={<AuraSneakersFuture />} />
                  <Route path="/product/fashion-jacket-1" element={<AuraStealthTechParka />} />
                  <Route path="/product/fashion-hoodie-1" element={<AuraEssentialHoodie />} />
                  <Route path="/product/fashion-watch-1" element={<AuraLuxuryTimepiece />} />
                  <Route path="/product/fashion-backpack-1" element={<AuraUrbanCommuter />} />
                  <Route path="/product/beauty-serum-1" element={<AuraBioLuminousSerum />} />
                  <Route path="/product/beauty-cream-1" element={<AuraRenewalCream />} />
                  <Route path="/product/beauty-mask-1" element={<AuraClayMask />} />
                  <Route path="/product/beauty-oil-1" element={<AuraGoldenElixir />} />
                  <Route path="/product/beauty-cleanser-1" element={<AuraEnzymeCleanser />} />
                  <Route path="/product/gaming-console-1" element={<AuraPlayConsoleX />} />
                  <Route path="/product/gaming-pc-1" element={<AuraOmegaBattleStation />} />
                  <Route path="/product/gaming-keyboard-1" element={<AuraMechXKeyboard />} />
                  <Route path="/product/gaming-mouse-1" element={<AuraGlideZeroMouse />} />
                  <Route path="/product/gaming-headset-1" element={<AuraAtmosWireless />} />
                  <Route path="/product/watch-classic-1" element={<AuraHeritageAutomatic />} />
                  <Route path="/product/watch-sport-1" element={<AuraDiverPro />} />
                  <Route path="/product/watch-smart-1" element={<AuraHorizonSmartwatch />} />
                  <Route path="/product/watch-minimal-1" element={<AuraLunarMinimalist />} />
                  <Route path="/product/watch-executive-1" element={<AuraExecutiveGold />} />
                  <Route path="/product/sports-bike-1" element={<AuraSpeedProBike />} />
                  <Route path="/product/sports-gym-1" element={<AuraPeakSmartGym />} />
                  <Route path="/product/sports-treadmill-1" element={<AuraHydroTreadmill />} />
                  <Route path="/product/sports-watch-1" element={<AuraSportWatch />} />
                  <Route path="/product/sports-weights-1" element={<AuraFlexWeights />} />
                  <Route path="/product/furn-sofa-1" element={<AuraCloudSofa />} />
                  <Route path="/product/furn-desk-1" element={<AuraLumosDesk />} />
                  <Route path="/product/furn-chair-1" element={<AuraErgoChair />} />
                  <Route path="/product/furn-bed-1" element={<AuraSmartBed />} />
                  <Route path="/product/furn-lamp-1" element={<AuraFloatingLamp />} />
                  <Route path="/product/audio-pro-1" element={<AuraSoundPro />} />
                  <Route path="/product/elec-laptop-1" element={<AuraBookPro16 />} />
                  <Route path="/product/elec-camera-2" element={<AuraSnapX1 />} />
                  <Route path="/product/elec-monitor-1" element={<AuraVisionCurved />} />
                  <Route path="/product/elec-drone-1" element={<AuraSkyGuardian />} />
                  <Route path="/product/elec-tablet-1" element={<AuraTabUltra />} />
                  <Route path="/audio-experience" element={<AudioExperience />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/returns-centre" element={<ReturnsCentre />} />
                  <Route path="/help-support" element={<HelpSupport />} />
                  <Route path="/gift-cards" element={<GiftCards />} />
                  <Route path="/press-releases" element={<PressReleases />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/smart-tech-wrist" element={<SmartTechWrist />} />
                  <Route path="/urban-streetwear" element={<UrbanStreetwear />} />
                  <Route path="/unleash-power" element={<UnleashUltimatePower />} />
                  <Route path="/step-future" element={<StepIntoFuture />} />
                  <Route path="/push-limits" element={<PushYourLimits />} />
                  <Route path="/upgrade-space" element={<UpgradeSpace />} />
                  <Route path="/admin-stats" element={<AdminStats />} />
                </Routes>
              </SmoothScroll>
            </Router>
          </CartProvider>
        </LocationProvider>
      )}
    </AuthProvider>
  );
}

export default App;

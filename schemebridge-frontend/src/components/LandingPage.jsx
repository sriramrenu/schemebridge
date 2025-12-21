import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  IconButton,
  Tooltip
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import TranslateIcon from '@mui/icons-material/Translate';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";
import AuthModal from "./AuthModal";
import { useLanguage } from "./LanguageContext";

export default function LandingPage() {
  const { t, toggleLanguage, lang } = useLanguage();
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const navigate = useNavigate();

  const [guestData, setGuestData] = useState({
    age: "",
    income: "",
    category: "",
    location: ""
  });

  const handleGuestSubmit = async () => {
    try {
      setLoading(true);
      const profileRes = await fetch(`${API_BASE}/api/guest/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(guestData.age),
          income: Number(guestData.income),
          category: guestData.category,
          location: guestData.location,
          gender: "MALE"
        })
      });
      const profile = await profileRes.json();
      const schemeRes = await fetch(
        `${API_BASE}/api/recommend/profile/${profile.id}`
      );
      const data = await schemeRes.json();
      setSchemes(data);
      setLoading(false);
    } catch (err) {
      console.error("Guest error:", err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a Tamil voice if lang is 'ta'
    if (lang === 'ta') {
      const voices = window.speechSynthesis.getVoices();
      const tamilVoice = voices.find(v => v.lang.includes('ta'));
      if (tamilVoice) utterance.voice = tamilVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',
        overflow: 'hidden',
        p: 3
      }}
    >
      {/* Background Orbs */}
      <Box sx={{
        position: 'absolute', top: -100, left: -100, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(40px)', zIndex: -1
      }} />
      <Box sx={{
        position: 'absolute', bottom: -100, right: -100, width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)', zIndex: -1
      }} />

      {/* Language Toggle */}
      <Box position="absolute" top={20} right={20} zIndex={10}>
        <Button
          startIcon={<TranslateIcon />}
          onClick={toggleLanguage}
          sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)' }}
          variant="outlined"
        >
          {lang === 'en' ? 'தமிழ்' : 'English'}
        </Button>
      </Box>

      {/* Hero Section */}
      <Stack spacing={4} alignItems="center" textAlign="center" maxWidth={800} zIndex={1}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h1" fontWeight={800} sx={{
            background: 'linear-gradient(to right, #fff, #a5b4fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '3rem', md: '5rem' }
          }}>
            {t('appTitle')}
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Typography variant="h5" color="rgba(255,255,255,0.7)">
            {t('tagline')}
          </Typography>
        </motion.div>

        {!showGuestForm && !schemes.length && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={4}>
              <Button
                variant="contained"
                size="large"
                startIcon={<MicIcon />}
                onClick={() => setShowGuestForm(true)}
                sx={{
                  borderRadius: '50px',
                  px: 4, py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(118, 75, 162, 0.4)'
                }}
              >
                {t('continueGuest')}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => setAuthOpen(true)}
                sx={{
                  borderRadius: '50px',
                  px: 4, py: 1.5,
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.4)',
                  fontSize: '1.1rem'
                }}
              >
                {t('loginSignup')}
              </Button>
            </Stack>
          </motion.div>
        )}
      </Stack>

      {/* Guest Form (Glass Card) */}
      {showGuestForm && !schemes.length && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 500, marginTop: 40, zIndex: 1 }}>
          <Box className="glass-container" p={4}>
            <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
              {t('guestFormTitle')}
            </Typography>
            <Stack spacing={2}>
              <TextField label={t('age')} type="number" value={guestData.age} onChange={(e) => setGuestData({ ...guestData, age: e.target.value })}
                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                InputProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
              />
              <TextField label={t('income')} type="number" value={guestData.income} onChange={(e) => setGuestData({ ...guestData, income: e.target.value })}
                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                InputProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
              />
              <TextField label={t('category')} value={guestData.category} onChange={(e) => setGuestData({ ...guestData, category: e.target.value })}
                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                InputProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
              />
              <TextField label={t('location')} value={guestData.location} onChange={(e) => setGuestData({ ...guestData, location: e.target.value })}
                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                InputProps={{ style: { color: 'white' } }}
                sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
              />
              <Button onClick={handleGuestSubmit} disabled={loading} variant="contained" size="large" sx={{ mt: 2, background: 'white', color: '#302b63', fontWeight: 'bold' }}>
                {loading ? t('loading') : t('guestSubmit')}
              </Button>
            </Stack>
          </Box>
        </motion.div>
      )}

      {/* Scheme Results */}
      {schemes.length > 0 && (
        <Box mt={5} maxWidth={1000} width="100%" zIndex={1}>
          <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold"> {t('eligibleSchemes')} </Typography>
          <Stack spacing={2}>
            {schemes.map((s, index) => (
              <motion.div
                key={s.scheme.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box className="glass-card" p={3} position="relative" overflow="hidden">
                  {/* Decorative circle for match score mock */}
                  <Box position="absolute" top={10} right={10} width={60} height={60} borderRadius="50%" display="flex" alignItems="center" justifyContent="center" border="4px solid #4ade80">
                    <Typography variant="caption" fontWeight="bold" color="#4ade80">98%</Typography>
                  </Box>

                  <Typography variant="h5" color="#a5b4fc" fontWeight="bold">{s.scheme.schemeName}</Typography>
                  <Typography variant="body1" color="rgba(255,255,255,0.8)" mt={1}>{s.scheme.description}</Typography>

                  <Box bgcolor="rgba(74, 222, 128, 0.2)" p={1.5} borderRadius={2} mt={2} display="inline-block" border="1px solid rgba(74, 222, 128, 0.4)">
                    <Typography variant="subtitle2" color="#4ade80" fontWeight="bold">
                      ✅ {t('reasonPrefix')} {s.reason}
                    </Typography>
                  </Box>

                  <IconButton onClick={() => speak(`${s.scheme.schemeName}. ${t('reasonPrefix')} ${s.reason}`)} sx={{ color: 'white', float: 'right', mt: 2 }}>
                    <MicIcon />
                  </IconButton>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Box>
      )}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={(user) => {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/dashboard");
        }}
      />
    </Box>
  );
}

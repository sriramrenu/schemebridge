import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TranslateIcon from '@mui/icons-material/Translate';
import { motion } from "framer-motion";
import API_BASE from "../api";
import { useLanguage } from "./LanguageContext";

export default function Dashboard() {
  const { t, lang, toggleLanguage } = useLanguage();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🛑 HARD STOP IF USER MISSING
  if (!user || !user.id) {
    return (
      <Box p={4}>
        <Typography color="error" variant="h6">
          Session expired. Please login again.
        </Typography>
      </Box>
    );
  }

  const [profile, setProfile] = useState({
    age: "",
    gender: "",
    category: "",
    caste: "",
    location: "",
    tenthMarks: "",
    twelfthMarks: "",
    course: "",
    familyIncome: "",
    parentOccupation: ""
  });

  const [schemes, setSchemes] = useState([]);
  const [saved, setSaved] = useState(false);

  const saveProfileAndFetch = async () => {
    try {
      console.log("Saving profile for user:", user.id);

      const saveRes = await fetch(
        `${API_BASE}/api/profile/${user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile)
        }
      );

      if (!saveRes.ok) {
        throw new Error("Profile save failed");
      }

      const schemeRes = await fetch(
        `${API_BASE}/api/recommend/${user.id}`
      );

      if (!schemeRes.ok) {
        throw new Error("Scheme fetch failed");
      }

      const data = await schemeRes.json();
      setSchemes(data);
      setSaved(true);

    } catch (err) {
      console.error("Dashboard error:", err);
      alert("Error while saving profile or fetching schemes");
    }
  };

  const speakSchemes = (text = null) => {
    if (!window.speechSynthesis) return;

    // If text is provided (individual scheme), speak that
    if (text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang === 'ta') {
        const voices = window.speechSynthesis.getVoices();
        const tamilVoice = voices.find(v => v.lang.includes('ta'));
        if (tamilVoice) utterance.voice = tamilVoice;
      }
      window.speechSynthesis.speak(utterance);
      return;
    }

    // Otherwise speak all schemes summary
    if (schemes.length === 0) return;
    window.speechSynthesis.cancel();
    let speechText = lang === 'ta' ? "தகுதியான திட்டங்கள் : " : "Eligible schemes are: ";
    schemes.forEach((s, i) => {
      speechText += `${i + 1}. ${s.scheme.schemeName}. `;
    });

    const utterance = new SpeechSynthesisUtterance(speechText);
    if (lang === 'ta') {
      const voices = window.speechSynthesis.getVoices();
      const tamilVoice = voices.find(v => v.lang.includes('ta'));
      if (tamilVoice) utterance.voice = tamilVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Box p={4} maxWidth={1400} mx="auto">
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

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {t('dashboard')}
        </Typography>
        <Typography color="rgba(255,255,255,0.7)" mb={4} variant="h6">
          {t('completeProfile')}
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={5}>
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Box className="glass-container" p={4}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="white">
                Edit Profile
              </Typography>
              <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label={t('age')} type="number" size="small" fullWidth
                      value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                      InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                      InputProps={{ style: { color: 'white' } }}
                      sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label={t('gender')} size="small" fullWidth
                      value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                      InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                      InputProps={{ style: { color: 'white' } }}
                      sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
                    />
                  </Grid>
                </Grid>

                <TextField label={t('category')} size="small"
                  value={profile.category} onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                  InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
                />
                <TextField label={t('location')} size="small"
                  value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
                />
                <TextField label={t('income')} size="small" type="number"
                  value={profile.familyIncome} onChange={(e) => setProfile({ ...profile, familyIncome: e.target.value })}
                  InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: 'white' } } }}
                />

                <Button
                  variant="contained"
                  size="large"
                  onClick={saveProfileAndFetch}
                  sx={{ mt: 2, borderRadius: 2, background: 'linear-gradient(to right, #6a11cb, #2575fc)', fontWeight: 'bold' }}
                >
                  {saved ? t('saved') : t('findSchemes')}
                </Button>

                {saved && (
                  <Typography color="#4ade80" textAlign="center" fontWeight="bold">
                    Profile saved successfully! ✅
                  </Typography>
                )}
              </Stack>
            </Box>
          </motion.div>
        </Grid>

        {/* Schemes Section */}
        <Grid item xs={12} md={7}>
          {schemes.length > 0 ? (
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold" color="white">
                  {t('eligibleSchemes')} ({schemes.length})
                </Typography>
                <Button
                  startIcon={<VolumeUpIcon />}
                  onClick={() => speakSchemes()}
                  variant="outlined"
                  size="small"
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  {t('speak')}
                </Button>
              </Stack>

              <Stack spacing={3}>
                {schemes.map((s, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Box className="glass-card" p={3} position="relative">
                      {/* Match Score Mock */}
                      <Box position="absolute" top={15} right={15} width={50} height={50} borderRadius="50%" display="flex" alignItems="center" justifyContent="center" border="3px solid #4ade80">
                        <Typography variant="caption" fontWeight="bold" color="#4ade80">95%</Typography>
                      </Box>

                      <Typography variant="h6" color="#a5b4fc" fontWeight="bold">
                        {s.scheme.schemeName}
                      </Typography>
                      <Typography variant="body2" color="rgba(255,255,255,0.8)" paragraph sx={{ mt: 1, mr: 6 }}>
                        {s.scheme.description}
                      </Typography>

                      <Box bgcolor="rgba(74, 222, 128, 0.1)" p={2} borderRadius={2} mt={2} border="1px solid rgba(74, 222, 128, 0.3)">
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                          <CheckCircleIcon color="success" fontSize="small" sx={{ mt: 0.3 }} />
                          <Typography variant="subtitle2" color="#4ade80" fontWeight="bold">
                            {t('reasonPrefix')} {s.reason}
                          </Typography>
                        </Stack>
                      </Box>

                      <IconButton onClick={() => speakSchemes(s.scheme.schemeName)} sx={{ color: 'white', mt: 1 }}>
                        <VolumeUpIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" minHeight={300} className="glass-container">
              <Typography variant="h6" color="rgba(255,255,255,0.6)">
                {t('noSchemes')}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

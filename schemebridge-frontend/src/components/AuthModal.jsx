import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Typography
} from "@mui/material";
import API_BASE from "../api";

export default function AuthModal({ open, onClose, onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    const url = isSignup
      ? `${API_BASE}/api/auth/signup`
      : `${API_BASE}/api/auth/login`;

    const payload = isSignup
      ? form
      : { email: form.email, password: form.password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      alert("Authentication failed");
      return;
    }

    const user = await res.json();
    onLogin(user);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{isSignup ? "Sign Up" : "Login"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {isSignup && (
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <TextField
            label="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Button variant="contained" onClick={handleSubmit}>
            {isSignup ? "Create Account" : "Login"}
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "New user? Sign Up"}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}


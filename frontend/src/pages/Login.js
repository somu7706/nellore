import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Heart, Eye, EyeOff, Loader2, Mail, Lock, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";

const Login = () => {
  const { t } = useTranslation();
  const { login, googleLogin, requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('password'); // 'password' or 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Timer countdown effect
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email or mobile number');
      return;
    }

    // Basic validation
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isMobile = /^\+?[1-9]\d{1,14}$/.test(email);

    if (!isEmail && !isMobile) {
      toast.error('Invalid email or mobile number format');
      return;
    }

    setLoading(true);
    try {
      const res = await requestOtp(email);
      setOtpSent(true);
      setResendTimer(30);
      toast.success(`OTP sent to your ${isMobile ? 'mobile' : 'email'}!`);
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email, otp);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      await googleLogin(credentialResponse.credential);
      toast.success('Logged in with Google!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background ecg-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">
              <span className="text-primary">Vital</span>Wave
            </span>
          </Link>
        </div>

        <Card className="glass-panel border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('auth.loginTitle')}</CardTitle>
            <CardDescription>{t('auth.loginSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Google Login Section */}
            <div className="flex justify-center flex-col items-center gap-4">
              <GoogleLogin
                onSuccess={(res) => {
                  console.log("Google Login SUCCESS:", res);
                  handleGoogleSuccess(res);
                }}
                onError={() => {
                  console.error("Google Login ERROR: This usually means the origin is not authorized or third-party cookies are blocked.");
                  toast.error('Google Sign-In failed. Check Browser Console (F12) for error details.');
                }}
                useOneTap={false}
                theme="filled_black"
                shape="pill"
                width="100%"
              />
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
              </div>
            </div>

            {mode === 'password' ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    <button type="button" className="text-xs text-primary hover:underline">
                      {t('auth.forgotPassword')}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-full" disabled={loading}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : t('auth.signIn')}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm text-primary"
                  onClick={() => setMode('otp')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Sign in with OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={otpSent ? handleOtpVerify : handleOtpRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp-identifier">{t('auth.emailOrMobile', 'Email or Mobile Number')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="otp-identifier"
                      type="text"
                      placeholder="you@example.com or +919876543210"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10"
                      required
                      disabled={otpSent}
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-4 flex flex-col items-center">
                    <Label>Verification Code</Label>
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      containerClassName="justify-center"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <p className="text-xs text-muted-foreground text-center">
                      We've sent a 6-digit code to your {/^\+?[1-9]\d{1,14}$/.test(email) ? 'mobile' : 'email'}.
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full h-12 rounded-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    otpSent ? 'Verify OTP' : 'Send Verification Code'
                  )}
                </Button>

                <div className="flex flex-col gap-2">
                  {otpSent && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs"
                      onClick={() => setOtpSent(false)}
                      disabled={loading}
                    >
                      Change Email/Mobile
                    </Button>
                  )}

                  {otpSent && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-muted-foreground"
                      onClick={(e) => {
                        // Logic to trigger resend would go here, effectively just calling handleOtpRequest again if we had it exposed or simple state reset
                        // For now, simpler to just allow them to go back or implementing a specific resend function.
                        // But 'handleOtpRequest' uses state 'email'.
                        handleOtpRequest(e);
                      }}
                      disabled={loading || resendTimer > 0}
                    >
                      {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-sm text-primary"
                    onClick={() => {
                      setMode('password');
                      setOtpSent(false);
                    }}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Sign in with Password
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t('auth.noAccount')} </span>
              <Link to="/signup" className="text-primary hover:underline font-medium">
                {t('auth.signUp')}
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Medical Disclaimer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          For awareness only. Always consult a licensed healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default Login;

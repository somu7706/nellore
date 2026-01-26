import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import {
  User,
  Palette,
  Globe,
  MapPin,
  Shield,
  Save,
  Loader2,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { user, updateUser, setLocation } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [locationQuery, setLocationQuery] = useState('');
  const [saving, setSaving] = useState(false);
  const [savingLocation, setSavingLocation] = useState(false);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    setSaving(true);
    try {
      await updateUser({ name: name.trim() });
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageChange = async (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    try {
      await updateUser({ preferred_language: lang });
    } catch (err) {
      console.error('Failed to save language preference');
    }
  };

  const handleThemeChange = async (newTheme) => {
    setTheme(newTheme);
    try {
      await updateUser({ theme: newTheme });
    } catch (err) {
      console.error('Failed to save theme preference');
    }
  };

  const handleLocationUpdate = async () => {
    if (!locationQuery.trim()) {
      toast.error('Please enter a location');
      return;
    }

    setSavingLocation(true);
    try {
      await setLocation('manual', { query: locationQuery });
      setLocationQuery('');
      toast.success('Location updated');
    } catch (err) {
      toast.error(err.message || 'Failed to update location');
    } finally {
      setSavingLocation(false);
    }
  };

  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }

    setSavingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await setLocation('auto', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast.success('Location updated');
        } catch (err) {
          toast.error('Failed to update location');
        } finally {
          setSavingLocation(false);
        }
      },
      () => {
        setSavingLocation(false);
        toast.error('Failed to get location');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6" data-testid="settings-page">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('settings.title')}</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="glass-panel border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="settings-name"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ''} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              className="rounded-full"
              data-testid="save-profile"
            >
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Theme Section */}
        <Card className="glass-panel border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              {t('settings.theme')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={handleThemeChange} className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-muted bg-background hover:bg-muted/50 peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                  data-testid="theme-light-option"
                >
                  <Sun className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{t('settings.light')}</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-muted bg-background hover:bg-muted/50 peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                  data-testid="theme-dark-option"
                >
                  <Moon className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{t('settings.dark')}</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-muted bg-background hover:bg-muted/50 peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                  data-testid="theme-system-option"
                >
                  <Monitor className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{t('settings.system')}</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Language Section */}
        <Card className="glass-panel border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {t('settings.language')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={i18n.language} onValueChange={handleLanguageChange}>
              <SelectTrigger data-testid="language-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card className="glass-panel border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {t('settings.location')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.location_label && (
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground">Current Location</p>
                <p className="font-medium">{user.location_label}</p>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Enter city, pincode, or address"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                data-testid="location-input"
              />
              <Button
                onClick={handleLocationUpdate}
                disabled={savingLocation}
                data-testid="update-location"
              >
                {savingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleAutoLocation}
              disabled={savingLocation}
              className="w-full"
              data-testid="auto-detect-location"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Auto-detect Location
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Section */}
        <Card className="glass-panel border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {t('settings.privacy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Your health data is encrypted and stored securely. We never share your information without your explicit consent.
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Export</p>
                <p className="text-sm text-muted-foreground">Download all your data</p>
              </div>
              <Button variant="outline" size="sm" data-testid="export-data">
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-destructive">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account</p>
              </div>
              <Button variant="destructive" size="sm" data-testid="delete-account">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;

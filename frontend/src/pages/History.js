import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  FileText,
  Calendar,
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const History = () => {
  const { t } = useTranslation();
  const { api, refreshUser } = useAuth();
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await api.get('/uploads');
        setUploads(response.data.items || []);
      } catch (err) {
        console.error('Failed to fetch uploads:', err);
        toast.error('Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchUploads();
  }, [api]);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setDeleting(true);
    try {
      await api.delete(`/uploads/${deleteId}`);
      setUploads(prev => prev.filter(u => u.id !== deleteId));
      await refreshUser();
      toast.success('Upload deleted');
    } catch (err) {
      toast.error('Failed to delete');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const getDocTypeConfig = (type) => {
    const configs = {
      prescription: { icon: '💊', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      lab_report: { icon: '🧪', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      xray: { icon: '📷', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
      wound: { icon: '🩹', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
      discharge: { icon: '📋', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
      link: { icon: '🔗', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      unknown: { icon: '📄', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }
    };
    return configs[type] || configs.unknown;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6" data-testid="history-page">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('nav.history')}</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your uploaded documents
            </p>
          </div>
          <Link to="/upload">
            <Button className="rounded-full" data-testid="new-upload-btn">
              <Upload className="h-4 w-4 mr-2" />
              New Upload
            </Button>
          </Link>
        </div>

        {/* Uploads List */}
        {uploads.length > 0 ? (
          <div className="grid gap-4">
            {uploads.map((upload) => {
              const config = getDocTypeConfig(upload.doc_type);
              return (
                <Card key={upload.id} className="glass-panel border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                        {config.icon}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-foreground truncate">{upload.filename}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={config.color}>{upload.doc_type}</Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(upload.created_at)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* View Details */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setSelectedUpload(upload)}
                                  data-testid={`view-${upload.id}`}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh]">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <span className="text-2xl">{config.icon}</span>
                                    {upload.filename}
                                  </DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="max-h-[60vh]">
                                  <div className="space-y-4 p-1">
                                    {/* Summary */}
                                    {upload.summary_short?.length > 0 && (
                                      <div>
                                        <h4 className="font-medium mb-2">Summary</h4>
                                        <ul className="space-y-1">
                                          {upload.summary_short.map((item, i) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                              <span className="text-primary mt-1">•</span>
                                              {item}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Detailed Summary */}
                                    {upload.summary_detailed && (
                                      <div>
                                        <h4 className="font-medium mb-2">Details</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                          {upload.summary_detailed}
                                        </p>
                                      </div>
                                    )}

                                    {/* Medicines */}
                                    {upload.medicines?.length > 0 && (
                                      <div>
                                        <h4 className="font-medium mb-2">Medicines</h4>
                                        <div className="flex flex-wrap gap-2">
                                          {upload.medicines.map((med, i) => (
                                            <Badge key={i} variant="secondary">💊 {med.name}</Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Lab Values */}
                                    {upload.lab_values?.length > 0 && (
                                      <div>
                                        <h4 className="font-medium mb-2">Lab Values</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                          {upload.lab_values.map((val, i) => (
                                            <div key={i} className="p-2 rounded-lg bg-muted/50">
                                              <p className="text-xs text-muted-foreground">{val.name}</p>
                                              <p className="font-medium">{val.value} {val.unit}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Extracted Text */}
                                    {upload.extracted_text && (
                                      <div>
                                        <h4 className="font-medium mb-2">Extracted Text</h4>
                                        <div className="p-3 rounded-lg bg-muted/50 text-xs font-mono max-h-40 overflow-auto">
                                          {upload.extracted_text}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>

                            {/* Delete */}
                            <Dialog open={deleteId === upload.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setDeleteId(upload.id)}
                                  className="text-destructive hover:text-destructive"
                                  data-testid={`delete-${upload.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Upload</DialogTitle>
                                </DialogHeader>
                                <p className="text-muted-foreground">
                                  Are you sure you want to delete "{upload.filename}"? This action cannot be undone.
                                </p>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setDeleteId(null)}>
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    data-testid="confirm-delete"
                                  >
                                    {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        {/* Quick Summary */}
                        {upload.summary_short?.[0] && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {upload.summary_short[0]}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="glass-panel border-border/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No uploads yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first medical document to get started
              </p>
              <Link to="/upload">
                <Button className="rounded-full" data-testid="first-upload-btn">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default History;

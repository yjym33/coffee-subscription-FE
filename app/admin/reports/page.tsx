"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";
import { FileText, Download, Calendar, TrendingUp, Users, Package, Coffee, BarChart3 } from "lucide-react";

import { availableReports, recentReports } from "@/data/admin/reports";

export default function AdminReports() {
  const { language } = useLanguage();
  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    if (!selectedReportType || !selectedDateRange) return;

    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Reset form
      setSelectedReportType("");
      setSelectedDateRange("");
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "ko" ? "ko-KR" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.reports.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.reports.subtitle", language)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Report Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t("admin.reports.generate", language)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="report-type">
                  {t("admin.reports.reportType", language)}
                </Label>
                <Select
                  value={selectedReportType}
                  onValueChange={setSelectedReportType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">
                      {t("admin.reports.types.sales", language)}
                    </SelectItem>
                    <SelectItem value="customers">
                      {t("admin.reports.types.customers", language)}
                    </SelectItem>
                    <SelectItem value="products">
                      {t("admin.reports.types.products", language)}
                    </SelectItem>
                    <SelectItem value="subscriptions">
                      {t("admin.reports.types.subscriptions", language)}
                    </SelectItem>
                    <SelectItem value="inventory">
                      {t("admin.reports.types.inventory", language)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date-range">
                  {t("admin.reports.dateRange", language)}
                </Label>
                <Select
                  value={selectedDateRange}
                  onValueChange={setSelectedDateRange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lastWeek">
                      {t("admin.reports.filters.lastWeek", language)}
                    </SelectItem>
                    <SelectItem value="lastMonth">
                      {t("admin.reports.filters.lastMonth", language)}
                    </SelectItem>
                    <SelectItem value="lastQuarter">
                      {t("admin.reports.filters.lastQuarter", language)}
                    </SelectItem>
                    <SelectItem value="lastYear">
                      {t("admin.reports.filters.lastYear", language)}
                    </SelectItem>
                    <SelectItem value="custom">
                      {t("admin.reports.filters.custom", language)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateReport}
                disabled={
                  !selectedReportType || !selectedDateRange || isGenerating
                }
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    {t("admin.reports.generate", language)}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{report.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {report.dateRange}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Generated: {formatDate(report.generatedAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.status === "completed" ? (
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          {t("admin.reports.download", language)}
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-amber-600">
                          <div className="h-2 w-2 animate-spin rounded-full border border-amber-600 border-t-transparent" />
                          Processing...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Report Types */}
        <Card>
          <CardHeader>
            <CardTitle>Available Report Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableReports.map((report) => {
                const iconMap = { TrendingUp, Users, Package, Coffee, BarChart3 } as const;
                const Icon = iconMap[report.icon as keyof typeof iconMap];
                return (
                  <div
                    key={report.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {t(report.name, language)}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {report.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last: {report.lastGenerated}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet, Code, Printer, Save } from 'lucide-react';
import { exportAsJSON, exportAsCSV, exportAsTXT, exportAsPrintableHTML, printList, ExportData } from '@/utils/fileExport';
import { useToast } from '@/hooks/use-toast';

interface ExportMenuProps {
  data: ExportData;
  onSaveToDatabase?: () => void;
  isSaving?: boolean;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ data, onSaveToDatabase, isSaving = false }) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (exportFunction: (data: ExportData) => void, format: string) => {
    setIsExporting(true);
    try {
      exportFunction(data);
      toast({
        title: "Export Successful!",
        description: `Your grocery list has been exported as ${format}.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: `Failed to export as ${format}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex gap-3">
      {onSaveToDatabase && (
        <Button
          onClick={onSaveToDatabase}
          disabled={isSaving}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save to Database"}
        </Button>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isExporting}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export List"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem
            onClick={() => handleExport(exportAsTXT, "TXT")}
            className="cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export as Text File
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport(exportAsCSV, "CSV")}
            className="cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport(exportAsJSON, "JSON")}
            className="cursor-pointer"
          >
            <Code className="w-4 h-4 mr-2" />
            Export as JSON
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport(exportAsPrintableHTML, "HTML")}
            className="cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export as HTML
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleExport(printList, "Print")}
            className="cursor-pointer"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print List
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExportMenu;
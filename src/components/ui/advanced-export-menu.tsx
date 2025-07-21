import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet, Code, Printer, Save, Database, FileImage, FileX, Smartphone } from 'lucide-react';
import { 
  exportAsEnhancedJSON, 
  exportAsEnhancedCSV, 
  exportAsStyledHTML, 
  exportAsXML, 
  exportAsMarkdown,
  exportAsExcel,
  printEnhancedList,
  saveToLocalStorage,
  ExportData 
} from '@/utils/advancedFileExport';
import { useToast } from '@/hooks/use-toast';
import EnhancedIconButton from './enhanced-icon-button';

interface AdvancedExportMenuProps {
  data: ExportData;
  onSaveToDatabase?: () => void;
  isSaving?: boolean;
  showLocalStorage?: boolean;
}

const AdvancedExportMenu: React.FC<AdvancedExportMenuProps> = ({ 
  data, 
  onSaveToDatabase, 
  isSaving = false,
  showLocalStorage = true 
}) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (exportFunction: (data: ExportData) => void, format: string) => {
    setIsExporting(true);
    try {
      exportFunction(data);
      toast({
        title: "Export Successful! 🎉",
        description: `Your grocery list has been exported as ${format}.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed ❌",
        description: `Failed to export as ${format}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleLocalStorageSave = () => {
    try {
      const key = saveToLocalStorage(data);
      toast({
        title: "Saved Locally! 💾",
        description: `Your grocery list has been saved to local storage.`,
      });
    } catch (error) {
      toast({
        title: "Save Failed ❌",
        description: "Failed to save to local storage.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Grocery List - ${data.username}`,
          text: `Shopping list for ${data.familySize} family members with ${data.totalItems} items`,
          url: window.location.href
        });
        toast({
          title: "Shared Successfully! 📱",
          description: "Your grocery list has been shared.",
        });
      } catch (error) {
        toast({
          title: "Share Failed ❌",
          description: "Failed to share the list.",
          variant: "destructive",
        });
      }
    } else {
      // Fallback: copy to clipboard
      const textContent = `Grocery List for ${data.username}\n\n${data.items.map(item => `• ${item.name} - ×${item.quantity}`).join('\n')}`;
      navigator.clipboard.writeText(textContent);
      toast({
        title: "Copied to Clipboard! 📋",
        description: "Your grocery list has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {onSaveToDatabase && (
        <EnhancedIconButton
          onClick={onSaveToDatabase}
          disabled={isSaving}
          variant="success"
          size="lg"
          icon={Database}
          glowEffect
          loading={isSaving}
        >
          {isSaving ? "Saving..." : "Save to Database"}
        </EnhancedIconButton>
      )}
      
      {showLocalStorage && (
        <EnhancedIconButton
          onClick={handleLocalStorageSave}
          variant="secondary"
          size="lg"
          icon={Save}
          glowEffect
        >
          Save Locally
        </EnhancedIconButton>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EnhancedIconButton
            disabled={isExporting}
            variant="primary"
            size="lg"
            icon={Download}
            glowEffect
            loading={isExporting}
          >
            {isExporting ? "Exporting..." : "Export List"}
          </EnhancedIconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-sm border-2 border-blue-200">
          <DropdownMenuLabel className="text-center font-bold text-blue-700">
            📁 Export Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={() => handleExport(exportAsStyledHTML, "Styled HTML")}
            className="cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <FileImage className="w-4 h-4 mr-3 text-blue-600" />
            <div>
              <div className="font-medium">Styled HTML</div>
              <div className="text-xs text-gray-500">Beautiful web page format</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => handleExport(exportAsEnhancedCSV, "Enhanced CSV")}
            className="cursor-pointer hover:bg-green-50 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 mr-3 text-green-600" />
            <div>
              <div className="font-medium">Enhanced CSV</div>
              <div className="text-xs text-gray-500">Excel compatible with categories</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => handleExport(exportAsExcel, "Excel Format")}
            className="cursor-pointer hover:bg-green-50 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 mr-3 text-green-700" />
            <div>
              <div className="font-medium">Excel Format</div>
              <div className="text-xs text-gray-500">Direct Excel import</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => handleExport(exportAsEnhancedJSON, "Enhanced JSON")}
            className="cursor-pointer hover:bg-purple-50 transition-colors"
          >
            <Code className="w-4 h-4 mr-3 text-purple-600" />
            <div>
              <div className="font-medium">Enhanced JSON</div>
              <div className="text-xs text-gray-500">With metadata and structure</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => handleExport(exportAsMarkdown, "Markdown")}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4 mr-3 text-gray-600" />
            <div>
              <div className="font-medium">Markdown</div>
              <div className="text-xs text-gray-500">GitHub/documentation format</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => handleExport(exportAsXML, "XML Format")}
            className="cursor-pointer hover:bg-orange-50 transition-colors"
          >
            <FileX className="w-4 h-4 mr-3 text-orange-600" />
            <div>
              <div className="font-medium">XML Format</div>
              <div className="text-xs text-gray-500">Structured data format</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={() => handleExport(printEnhancedList, "Print")}
            className="cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <Printer className="w-4 h-4 mr-3 text-blue-600" />
            <div>
              <div className="font-medium">Print List</div>
              <div className="text-xs text-gray-500">Enhanced print layout</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={handleShare}
            className="cursor-pointer hover:bg-pink-50 transition-colors"
          >
            <Smartphone className="w-4 h-4 mr-3 text-pink-600" />
            <div>
              <div className="font-medium">Share</div>
              <div className="text-xs text-gray-500">Mobile share or copy</div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdvancedExportMenu;
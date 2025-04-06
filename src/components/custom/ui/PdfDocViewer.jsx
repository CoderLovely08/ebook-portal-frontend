import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FileText } from "lucide-react";

const PdfViewerModal = ({ title, path, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="max-w-4xl h-[80vh] p-0">
                <div className="w-full h-full">
                    <iframe
                        src={path}
                        width="100%"
                        height="100%"
                        className="border-none"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PdfViewerModal;

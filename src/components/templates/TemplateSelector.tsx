
import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TemplateCard, Template } from "./TemplateCard"

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: number | null
  setSelectedTemplate: (id: number) => void
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  setSelectedTemplate
}) => {
  return (
    <div className="h-full overflow-hidden">
      <ScrollArea className="h-full px-4 py-4">
        <div className="space-y-4 pr-4">
          {templates.map((template) => (
            <TemplateCard 
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onClick={() => setSelectedTemplate(template.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

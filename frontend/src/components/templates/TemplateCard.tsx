
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface Template {
  id: number
  name: string
  category: string
  preview: string
  description: string
  previewImage?: string
  featured?: boolean
}

interface TemplateCardProps {
  template: Template
  isSelected: boolean
  onClick: () => void
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onClick
}) => {
  return (
    <Card 
      key={template.id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? 'bg-gradient-wizora text-white'
          : 'hover:bg-gray-50 bg-white border-gray-200'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{template.preview}</span>
            <div>
              <h3 className={`font-medium ${
                isSelected ? 'text-white' : 'text-gray-900'
              }`}>
                {template.name}
              </h3>
              <p className={`text-sm ${
                isSelected ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {template.description}
              </p>
            </div>
          </div>
          <Badge 
            variant={isSelected ? "secondary" : "outline"}
            className="text-xs"
          >
            {template.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

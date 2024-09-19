import { Button } from '@/components/ui/button'
import { useState } from 'react'

function MenuButton({onClick, className="", label}) {

const [isHovered, setIsHovered] = useState(false)

  return (
    <Button variant={isHovered ? "outline" : "default"} size="lg" className={`w-full ${className}`} onClick={onClick}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >{label}</Button>
  )
}

export default MenuButton
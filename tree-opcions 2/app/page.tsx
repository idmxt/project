"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

interface TreeNode {
  id: string
  title: string
  description: string
  details: string
  x: number
  y: number
  type: "trunk" | "branch" | "leaf" | "root"
  color?: string
}

const treeData: TreeNode[] = [
  // Ствол
  {
    id: "trunk",
    title: "Что такое опционы",
    description: "Основа финансовых деривативов",
    details:
      "Опцион — это контракт, который дает право (но не обязанность) купить или продать актив по определенной цене (страйк-цена) в определенное время. В отличие от акций, опционы не дают владения активом, а позволяют спекулировать на движении цены.",
    x: 50,
    y: 60,
    type: "trunk",
    color: "#8B4513",
  },
  // Крупные ветви
  {
    id: "call-option",
    title: "Колл-опцион",
    description: "Право купить актив",
    details:
      "Колл-опцион дает держателю право купить базовый актив по страйк-цене до или в день экспирации. Покупатель колл-опциона рассчитывает на рост цены актива выше страйк-цены.",
    x: 30,
    y: 35,
    type: "branch",
    color: "#22C55E",
  },
  {
    id: "put-option",
    title: "Пут-опцион",
    description: "Право продать актив",
    details:
      "Пут-опцион дает держателю право продать базовый актив по страйк-цене до или в день экспирации. Покупатель пут-опциона рассчитывает на падение цены актива ниже страйк-цены.",
    x: 70,
    y: 35,
    type: "branch",
    color: "#EF4444",
  },
  {
    id: "american-style",
    title: "Американский стиль",
    description: "Исполнение в любое время",
    details:
      "Американские опционы могут быть исполнены в любое время до даты экспирации включительно. Это дает больше гибкости держателю опциона.",
    x: 25,
    y: 20,
    type: "branch",
    color: "#3B82F6",
  },
  {
    id: "european-style",
    title: "Европейский стиль",
    description: "Исполнение только в день экспирации",
    details:
      "Европейские опционы могут быть исполнены только в день экспирации. Они обычно дешевле американских из-за меньшей гибкости.",
    x: 75,
    y: 20,
    type: "branch",
    color: "#8B5CF6",
  },
  // Мелкие ветви (стратегии)
  {
    id: "long-call",
    title: "Покупка колл",
    description: "Базовая бычья стратегия",
    details:
      "Покупка колл-опциона — простейшая стратегия для игры на повышение. Максимальный убыток ограничен премией, прибыль теоретически неограничена.",
    x: 20,
    y: 10,
    type: "leaf",
    color: "#10B981",
  },
  {
    id: "long-put",
    title: "Покупка пут",
    description: "Базовая медвежья стратегия",
    details:
      "Покупка пут-опциона — простейшая стратегия для игры на понижение. Максимальный убыток ограничен премией, прибыль ограничена страйк-ценой.",
    x: 80,
    y: 10,
    type: "leaf",
    color: "#F59E0B",
  },
  {
    id: "straddle",
    title: "Стрэддл",
    description: "Покупка колл и пут с одинаковым страйком",
    details:
      "Стрэддл — стратегия для игры на высокой волатильности. Покупаются колл и пут с одинаковыми страйками и экспирацией. Прибыль при сильном движении цены в любую сторону.",
    x: 35,
    y: 5,
    type: "leaf",
    color: "#EC4899",
  },
  {
    id: "strangle",
    title: "Стрэнгл",
    description: "Покупка колл и пут с разными страйками",
    details:
      "Стрэнгл похож на стрэддл, но использует разные страйки. Колл покупается выше текущей цены, пут — ниже. Дешевле стрэддла, но требует большего движения цены.",
    x: 65,
    y: 5,
    type: "leaf",
    color: "#6366F1",
  },
  // Корни (базовые активы)
  {
    id: "stocks",
    title: "Акции",
    description: "Опционы на отдельные акции",
    details:
      "Опционы на акции — самый популярный тип. Позволяют торговать на движении цен отдельных компаний с меньшим капиталом и ограниченным риском.",
    x: 20,
    y: 85,
    type: "root",
    color: "#059669",
  },
  {
    id: "indices",
    title: "Индексы",
    description: "Опционы на фондовые индексы",
    details:
      "Опционы на индексы (S&P 500, NASDAQ) позволяют торговать на движении всего рынка. Обычно расчетные, без физической поставки.",
    x: 35,
    y: 90,
    type: "root",
    color: "#0891B2",
  },
  {
    id: "currencies",
    title: "Валюты",
    description: "Валютные опционы",
    details: "Валютные опционы используются для хеджирования валютных рисков или спекуляций на движении курсов валют.",
    x: 50,
    y: 85,
    type: "root",
    color: "#DC2626",
  },
  {
    id: "commodities",
    title: "Товары",
    description: "Опционы на сырьевые товары",
    details:
      "Опционы на товары (золото, нефть, пшеница) позволяют торговать на сырьевых рынках без физического владения товаром.",
    x: 65,
    y: 90,
    type: "root",
    color: "#B45309",
  },
  {
    id: "etf",
    title: "ETF",
    description: "Опционы на биржевые фонды",
    details:
      "Опционы на ETF сочетают преимущества опционов и диверсификации фондов. Популярны для торговли секторами экономики.",
    x: 80,
    y: 85,
    type: "root",
    color: "#7C3AED",
  },
]

// Компонент листа без иконок
const LeafShape = ({
  type,
  color,
  size = "medium",
}: { type: string; color: string; size?: "small" | "medium" | "large" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  }

  if (type === "trunk") {
    // Большой лист для ствола
    return (
      <div className="relative">
        <svg viewBox="0 0 100 100" className={sizeClasses.large}>
          <path
            d="M50 10 Q30 30 20 50 Q30 70 50 90 Q70 70 80 50 Q70 30 50 10 Z"
            fill={color}
            stroke="#2D5016"
            strokeWidth="2"
            filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
          />
          <path d="M50 10 Q45 25 40 40 Q45 55 50 70 Q55 55 60 40 Q55 25 50 10" fill="rgba(255,255,255,0.2)" />
          <path d="M50 10 L50 90" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
    )
  } else if (type === "branch") {
    // Средний лист для ветвей
    return (
      <div className="relative">
        <svg viewBox="0 0 100 100" className={sizeClasses.medium}>
          <path
            d="M50 15 Q35 25 25 45 Q35 65 50 85 Q65 65 75 45 Q65 25 50 15 Z"
            fill={color}
            stroke="#2D5016"
            strokeWidth="2"
            filter="drop-shadow(1px 1px 3px rgba(0,0,0,0.3))"
          />
          <path d="M50 15 Q47 30 45 45 Q47 60 50 75 Q53 60 55 45 Q53 30 50 15" fill="rgba(255,255,255,0.2)" />
          <path d="M50 15 L50 85" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
    )
  } else if (type === "root") {
    // Лист-корень
    return (
      <div className="relative">
        <svg viewBox="0 0 100 100" className={sizeClasses.medium}>
          <path
            d="M50 20 Q40 30 35 45 Q40 60 50 80 Q60 60 65 45 Q60 30 50 20 Z"
            fill={color}
            stroke="#8B4513"
            strokeWidth="2"
            filter="drop-shadow(1px 1px 3px rgba(0,0,0,0.3))"
          />
          <path d="M50 20 Q48 35 47 50 Q48 65 50 80 Q52 65 53 50 Q52 35 50 20" fill="rgba(255,255,255,0.15)" />
          <path d="M50 20 L50 80" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
    )
  } else {
    // Маленький лист
    return (
      <div className="relative">
        <svg viewBox="0 0 100 100" className={sizeClasses.small}>
          <path
            d="M50 20 Q40 35 35 50 Q40 65 50 80 Q60 65 65 50 Q60 35 50 20 Z"
            fill={color}
            stroke="#2D5016"
            strokeWidth="3"
            filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
          />
          <path d="M50 20 Q48 35 47 50 Q48 65 50 80 Q52 65 53 50 Q52 35 50 20" fill="rgba(255,255,255,0.2)" />
          <path d="M50 20 L50 80" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
    )
  }
}

export default function OptionsTreePage() {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [showAllNodes, setShowAllNodes] = useState(false)

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node)
  }

  const closeModal = () => {
    setSelectedNode(null)
  }

  const toggleAllNodes = () => {
    setShowAllNodes(!showAllNodes)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 overflow-hidden">
      {/* Header */}
      <header className="relative z-10 p-4 text-center">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-green-800 mb-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🌳 Дерево Опционов
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-green-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Интерактивное путешествие в мир производных финансовых инструментов
        </motion.p>
        <motion.button
          onClick={toggleAllNodes}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAllNodes ? "Скрыть детали" : "Изучить всё дерево"}
        </motion.button>
      </header>

      {/* Tree Container with Background Image - Увеличенный размер */}
      <div className="relative w-full h-[85vh] mx-auto">
        {/* Background Tree Image - Увеличенный */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/images/tree-background.jpg"
              alt="Дерево опционов"
              fill
              style={{ objectFit: "contain" }}
              priority
              className="select-none pointer-events-none scale-110"
            />
          </div>
        </div>

        {/* Animated background elements - Falling petals */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
              }}
              animate={{
                y: ["0%", "105%"],
                x: [0, Math.random() * 100 - 50],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: 5 + Math.random() * 7,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 0C6 3.31371 8.68629 6 12 6C8.68629 6 6 8.68629 6 12C6 8.68629 3.31371 6 0 6C3.31371 6 6 3.31371 6 0Z"
                  fill={i % 3 === 0 ? "#FFCAD4" : i % 3 === 1 ? "#FFD6A5" : "#FFFFFC"}
                  fillOpacity="0.8"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Leaf Nodes */}
        {treeData.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: node.type === "leaf" ? [0, -8, 0] : [0, -3, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 1 + index * 0.1,
              y: {
                duration: 3 + Math.random(),
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              rotate: {
                duration: 4 + Math.random(),
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNodeClick(node)}
          >
            <LeafShape
              type={node.type}
              color={node.color || "#4CAF50"}
              size={
                node.type === "trunk" ? "large" : node.type === "branch" || node.type === "root" ? "medium" : "small"
              }
            />

            {(showAllNodes || node.type === "trunk") && (
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-3 min-w-48 max-w-64 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-bold text-gray-800 text-sm mb-1">{node.title}</h3>
                <p className="text-gray-600 text-xs">{node.description}</p>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Floating particles - Fireflies */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              backgroundColor: i % 3 === 0 ? "#FFEB3B" : i % 3 === 1 ? "#4CAF50" : "#FFC107",
              boxShadow: i % 3 === 0 ? "0 0 8px #FFEB3B" : i % 3 === 1 ? "0 0 8px #4CAF50" : "0 0 8px #FFC107",
            }}
            animate={{
              y: [0, Math.random() * -40 - 10],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-96 overflow-y-auto shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <LeafShape type={selectedNode.type} color={selectedNode.color || "#4CAF50"} size="medium" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedNode.title}</h2>
                    <p className="text-gray-600">{selectedNode.description}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-gray-700 leading-relaxed">{selectedNode.details}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 text-center p-4 text-green-700">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          Нажмите на листья дерева для получения подробной информации
        </motion.p>
      </footer>
    </div>
  )
}

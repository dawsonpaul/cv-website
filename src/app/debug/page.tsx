"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModelStats {
  totalCalls: number;
  totalTokens: number;
  averageLatency: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  interactions: Array<{
    timestamp: string;
    requestData: any;
    responseData: any;
  }>;
}

interface ModelMetrics {
  [key: string]: ModelStats;
}

const MODEL_LOGOS: { [key: string]: string } = {
  claude: "/logos/claude-logo.png",
  openai: "/logos/openai-logo.png",
  gemini: "/logos/gemini-logo.png",
};

const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {value}
    </motion.span>
  );
};

const MetricDisplay = ({
  label,
  value,
  unit = "",
}: {
  label: string;
  value: number;
  unit?: string;
}) => {
  return (
    <div className="flex justify-between px-2 py-2 rounded-lg hover:bg-primary-DEFAULT/5 transition-colors">
      <span className="text-text-gray">{label}:</span>
      <div className="flex items-center gap-1">
        <AnimatedNumber value={value} />
        <span className="text-text-light">{unit}</span>
      </div>
    </div>
  );
};

export default function DebugPage() {
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics>({
    claude: {
      totalCalls: 0,
      totalTokens: 0,
      averageLatency: 0,
      totalInputTokens: 0,
      totalOutputTokens: 0,
      interactions: [],
    },
    openai: {
      totalCalls: 0,
      totalTokens: 0,
      averageLatency: 0,
      totalInputTokens: 0,
      totalOutputTokens: 0,
      interactions: [],
    },
    gemini: {
      totalCalls: 0,
      totalTokens: 0,
      averageLatency: 0,
      totalInputTokens: 0,
      totalOutputTokens: 0,
      interactions: [],
    },
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "DEBUG_MESSAGE" && event.data.message.debug) {
        const { model } = event.data.message.debug;
        const { requestData, responseData } = event.data.message.debug;

        setModelMetrics((prev) => {
          const modelStats = prev[model];
          const newInteraction = {
            timestamp: new Date().toLocaleTimeString(),
            requestData,
            responseData,
          };

          // Calculate new averages and totals
          const newTotalCalls = modelStats.totalCalls + 1;
          const newTotalTokens =
            modelStats.totalTokens + responseData.totalTokens;
          const newTotalLatency =
            modelStats.averageLatency * modelStats.totalCalls +
            responseData.latency;

          return {
            ...prev,
            [model]: {
              totalCalls: newTotalCalls,
              totalTokens: newTotalTokens,
              averageLatency: newTotalLatency / newTotalCalls,
              totalInputTokens:
                modelStats.totalInputTokens + requestData.inputTokens,
              totalOutputTokens:
                modelStats.totalOutputTokens + responseData.outputTokens,
              interactions: [...modelStats.interactions, newInteraction],
            },
          };
        });
      }
    };

    window.addEventListener("message", handleMessage);
    window.opener?.postMessage({ type: "DEBUG_WINDOW_READY" }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-background-dark p-4">
      <motion.h1
        className="text-xl font-medium text-text-light mb-6 px-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        LLM Technical Metrics
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Object.entries(modelMetrics).map(([model, stats], index) => (
          <motion.div
            key={model}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card overflow-hidden shadow-card bg-black/90 hover:shadow-glow transition-shadow duration-300"
          >
            <motion.div
              className="border-b border-primary-light/20 bg-primary-DEFAULT/50 p-4"
              whileHover={{ backgroundColor: "rgba(30, 64, 175, 0.3)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <motion.img
                    src={MODEL_LOGOS[model]}
                    alt={`${model} logo`}
                    className="w-10 h-10 object-contain"
                    style={{ width: "40px", height: "40px" }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  <h2 className="text-lg font-medium capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-light">
                    {model}
                  </h2>
                </div>
                <motion.div
                  className="text-xs bg-primary-light/20 px-3 py-1 rounded-full text-primary-light"
                  whileHover={{ scale: 1.05 }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  key={stats.totalCalls} // Trigger animation on count change
                >
                  {stats.totalCalls} calls
                </motion.div>
              </div>
            </motion.div>

            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-primary-light text-sm font-medium mb-3 px-2">
                  Real-time Metrics
                </h3>
                <motion.div
                  className="grid grid-cols-1 gap-3 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <MetricDisplay
                    label="Total Tokens"
                    value={stats.totalTokens}
                  />
                  <MetricDisplay
                    label="Input Tokens"
                    value={stats.totalInputTokens}
                  />
                  <MetricDisplay
                    label="Output Tokens"
                    value={stats.totalOutputTokens}
                  />
                  <MetricDisplay
                    label="Avg. Latency"
                    value={Math.round(stats.averageLatency)}
                    unit="ms"
                  />
                </motion.div>
              </div>

              {stats.interactions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-primary-light text-sm font-medium mb-3 px-2">
                    Latest Metrics
                  </h3>
                  <motion.div
                    className="text-sm space-y-3"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <MetricDisplay
                      label="Response Time"
                      value={
                        stats.interactions[stats.interactions.length - 1]
                          .responseData.latency
                      }
                      unit="ms"
                    />
                    <MetricDisplay
                      label="Tokens Used"
                      value={
                        stats.interactions[stats.interactions.length - 1]
                          .responseData.totalTokens
                      }
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Horizontal Interaction History */}
      <motion.div
        className="mt-6 card overflow-hidden shadow-card bg-black/90"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="border-b border-primary-light/20 bg-primary-DEFAULT/50 p-4">
          <h2 className="text-white text-lg font-medium">
            Real-time Interaction Log
          </h2>
        </div>
        <div className="p-4 max-h-[200px] overflow-y-auto">
          <table className="w-full">
            <thead className="text-xs text-text-gray">
              <tr className="border-b border-gray-800/50">
                <th className="pb-2 text-left w-[180px]">Model</th>
                <th className="pb-2 text-left">Timestamp</th>
                <th className="pb-2 text-right">Input Tokens</th>
                <th className="pb-2 text-right">Output Tokens</th>
                <th className="pb-2 text-right">Total Tokens</th>
                <th className="pb-2 text-right">Latency</th>
                <th className="pb-2 text-right">Temperature</th>
                <th className="pb-2 text-right">Max Tokens</th>
                <th className="pb-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(modelMetrics).map(([model, stats]) =>
                stats.interactions.map((interaction, index) => (
                  <motion.tr
                    key={`${model}-${index}`}
                    className="border-b border-gray-800/30 hover:bg-primary-DEFAULT/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-4">
                      <div className="flex flex-col items-center gap-1">
                        <img
                          src={MODEL_LOGOS[model]}
                          alt={`${model} logo`}
                          className="w-5 h-5 object-contain"
                          style={{ width: "20px", height: "20px" }}
                        />
                        <span className="text-primary-light text-[10px] capitalize">
                          {model}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pl-8 text-sm text-text-light">
                      {interaction.timestamp}
                    </td>
                    <td className="py-4 text-right text-sm text-text-light">
                      <AnimatedNumber
                        value={interaction.requestData.inputTokens}
                      />
                    </td>
                    <td className="py-4 text-right text-sm text-text-light">
                      <AnimatedNumber
                        value={interaction.responseData.outputTokens}
                      />
                    </td>
                    <td className="py-4 text-right text-sm text-text-light">
                      <AnimatedNumber
                        value={interaction.responseData.totalTokens}
                      />
                    </td>
                    <td className="py-4 text-right text-sm text-text-light">
                      <AnimatedNumber
                        value={interaction.responseData.latency}
                      />
                      ms
                    </td>
                    <td className="py-4 text-right text-sm text-text-light">
                      {interaction.requestData.temperature}
                    </td>
                    <td className="py-4 text-right text-sm text-text-light">
                      {interaction.requestData.maxTokens}
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-sm text-text-light">
                        {interaction.responseData.finishReason || "complete"}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

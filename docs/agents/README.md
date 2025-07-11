# Voiceflow Agents Database

A comprehensive markdown database for organizing and managing Voiceflow conversational AI agents, functions, and extensions.

## .vf Files

**Note:** Voiceflow export files use the `.vf` extension but contain JSON data. These files are complete project exports that include:
- Agent definitions and configurations
- Custom functions and their code
- Flow diagrams and node connections
- Platform-specific data (slots, intents, variables)
- Project metadata and settings

To work with `.vf` files, treat them as JSON and extract components into organized markdown files for better version control and collaboration.

## Structure

### 📁 `/<client-name>`
Each client has their own dedicated directory containing all their Voiceflow components:

#### 📁 `/<client-name>/functions`
Contains custom JavaScript functions for Voiceflow agents. Functions are reusable steps that can:
- Perform text manipulation and data processing
- Make API calls to external services
- Handle complex logic and calculations
- Create dynamic conversation flows

**Function Requirements:**
- Written in JavaScript (ES6 on V8)
- Include clear descriptions and documentation
- Define input/output variables with descriptions
- Support multiple execution paths

#### 📁 `/<client-name>/instructions`
Agent node instructions and prompts that define conversational behavior. These include:
- Agent behavior instructions
- Conversation routing logic
- Knowledge base integration settings
- Exit conditions and flow control

**Best Practices:**
- Use clear, descriptive prompts
- Define specific agent capabilities
- Include knowledge base descriptions
- Set appropriate exit conditions

#### 📁 `/<client-name>/extensions`
Custom web chat widgets and extensions for enhanced user interactions:

**Response Extensions:**
- Interactive widgets (file uploads, calendars, payments)
- Custom UI components within chat

**Effect Extensions:**
- Website modifications triggered by chat
- Status updates and deep-linking
- Custom script execution

## Agent Node Capabilities

Voiceflow Agent Nodes provide:
- **Open-ended Input Handling**: Process natural language queries
- **Knowledge Base Search**: Automatic query optimization and retrieval
- **Function Execution**: Run custom JavaScript functions
- **Conversation Routing**: Dynamic flow control based on intent
- **Multi-step Chaining**: Connect multiple agent steps for complex workflows

## Quick Start

1. **Client Setup**: Create a new directory with your client's name: `/<client-name>`
2. **Functions**: Create reusable JavaScript functions in `/<client-name>/functions`
3. **Instructions**: Define agent behavior prompts in `/<client-name>/instructions`
4. **Extensions**: Build custom web chat widgets in `/<client-name>/extensions`
5. **Integration**: Connect components within Voiceflow's visual builder

## Resources

- [Voiceflow Agent Documentation](https://docs.voiceflow.com/docs/agents)
- [Custom Functions Guide](https://docs.voiceflow.com/docs/custom-functions)
- [Web Chat Extensions](https://docs.voiceflow.com/docs/custom-web-chat-widgets)
- [Function Marketplace](https://marketplace.voiceflow.com/functions)

---

*Organize your conversational AI components efficiently with this structured database approach.*
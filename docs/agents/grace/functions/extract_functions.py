#!/usr/bin/env python3
import json
import os
import sys

def extract_functions(json_file_path, output_dir):
    """Extract all custom functions from Voiceflow .vf file and create markdown files"""
    
    # Read the JSON file
    with open(json_file_path, 'r') as f:
        data = json.load(f)
    
    # Extract functions and variables
    functions = data.get('functions', [])
    func_vars = data.get('functionVariables', [])
    
    # Group variables by function ID
    from collections import defaultdict
    vars_by_function = defaultdict(list)
    
    for var in func_vars:
        func_id = var.get('functionID')
        if func_id:
            vars_by_function[func_id].append(var)
    
    # Create markdown files for each function
    created_files = []
    
    for func in functions:
        func_name = func.get('name', 'unknown')
        func_id = func.get('id')
        
        # Skip if no name
        if not func_name or func_name == 'unknown':
            continue
            
        # Clean function name for filename
        clean_name = func_name.replace(' ', '_').replace('[', '').replace(']', '')
        filename = f"{clean_name}.md"
        filepath = os.path.join(output_dir, filename)
        
        # Get variables for this function
        variables = vars_by_function.get(func_id, [])
        input_vars = [var for var in variables if var.get('type') == 'input']
        output_vars = [var for var in variables if var.get('type') == 'output']
        
        # Create input parameters table
        input_content = ""
        if input_vars:
            input_content += "| Parameter | Description |\n"
            input_content += "|-----------|-------------|\n"
            for var in input_vars:
                desc = var.get('description', '').strip()
                if not desc:
                    desc = 'No description'
                input_content += f"| {var.get('name', 'unknown')} | {desc} |\n"
        else:
            input_content = "No input parameters defined.\n"
        
        # Create output parameters table
        output_content = ""
        if output_vars:
            output_content += "| Parameter | Description |\n"
            output_content += "|-----------|-------------|\n"
            for var in output_vars:
                desc = var.get('description', '').strip()
                if not desc:
                    desc = 'No description'
                output_content += f"| {var.get('name', 'unknown')} | {desc} |\n"
        else:
            output_content = "No output parameters defined.\n"
        
        # Create markdown content
        content = f"""# {func_name}

**Function ID:** {func_id}

**Description:** {func.get('description') if func.get('description') else 'No description provided'}

**Created:** {func.get('createdAt')}
**Updated:** {func.get('updatedAt')}

## Input Parameters

{input_content}

## Output Parameters

{output_content}

## JavaScript Code

```javascript
{func.get('code', '')}
```

## Additional Metadata

**Path Order:** {func.get('pathOrder', [])}
**Created By ID:** {func.get('createdByID')}
**Updated By ID:** {func.get('updatedByID')}
**Folder ID:** {func.get('folderID')}
"""
        
        # Write to file
        with open(filepath, 'w') as f:
            f.write(content)
        
        created_files.append(filename)
        print(f"Created: {filename}")
    
    return created_files

if __name__ == "__main__":
    json_file = "/Users/broke/Downloads/Grace_V2-2025-07-11_15-00.vf"
    output_dir = "/Users/broke/umbral/umbral/docs/agents/grace/functions"
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Extract functions
    created_files = extract_functions(json_file, output_dir)
    
    print(f"\nSummary: Created {len(created_files)} function files:")
    for file in created_files:
        print(f"  - {file}")
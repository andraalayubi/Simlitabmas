import axios from "axios";
import { ProposalSuggestionForm } from "./_form";

async function fetchSchemas() {
  try {
    const response = await axios.get('/api/lecturer/schema');
    
    const result = response.data;
    console.log(result);
    
    if (result.success) {
      return result.data.map((schema: { id: number; name: string }) => ({
        value: schema.id.toString(),
        label: schema.name
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch schemas:', error);
    return [];
  }
}

export default async function ProposalSuggestionModal() {
  console.log('open modal');
  const schemas = await fetchSchemas();
  
  return <ProposalSuggestionForm schemas={schemas} />;
}

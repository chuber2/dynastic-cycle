import {Button} from '@/components/ui/button';

const App = () => {
  return (
    <div className="p-8">
      <Button>Click Me!</Button>
      <Button variant="outline" className="ml-2">
        Outline
      </Button>
      <Button variant="destructive" className="ml-2">
        Destructive
      </Button>
    </div>
  );
};

export default App;

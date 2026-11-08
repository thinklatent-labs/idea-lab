// A throw inside one view used to blank the whole page (audit N5). This keeps the frame, the dock and Jarvis up
// and says which view failed; moving to another view or reloading the register resets it.
import { Component, type ReactNode } from 'react';
import { Status } from '@kit/kit';

export class ViewBoundary extends Component<{ name: string; resetOn?: unknown; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  // A new register revision clears a failure without remounting the view (which would drop its filters).
  componentDidUpdate(prev: { resetOn?: unknown }) {
    if (this.state.error && prev.resetOn !== this.props.resetOn) this.setState({ error: null });
  }

  componentDidCatch(error: Error) {
    console.error(`[lab-dashboard] the ${this.props.name} view failed`, error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="kit-surface-content max-w-xl p-6">
        <Status tone="critical" word={`The ${this.props.name} view could not be drawn`} />
        <p className="mt-2 text-sm text-muted-foreground">
          {this.state.error.message}. The other views still work; tell the next lab chat so it can be fixed.
        </p>
      </div>
    );
  }
}

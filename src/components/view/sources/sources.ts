import { SourceItem } from '../../../types/types';
import './sources.css';

class Sources {
    public draw(data: ReadonlyArray<SourceItem>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            return;
        }

        data.forEach((item: SourceItem): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            const nameElement = sourceClone.querySelector('.source__item-name');
            const itemElement = sourceClone.querySelector('.source__item');

            if (nameElement) {
                nameElement.textContent = item.name;
            }

            if (itemElement) {
                itemElement.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import {
  Dimensions,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { height: screenHeight } = Dimensions.get('window');
const heroHeight = Math.max(360, Math.min(520, Math.round(screenHeight * 0.54)));

type TabKey = 'visual' | 'process' | 'proof' | 'reserve';

type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  proof: string;
  source: number;
  aspectRatio: number;
};

const palette = {
  bg: '#F6EFE4',
  panel: '#FFF9F1',
  panelSoft: 'rgba(255, 249, 241, 0.82)',
  line: 'rgba(18, 39, 59, 0.12)',
  navy: '#112C45',
  navyDeep: '#0A1E30',
  navySoft: '#35526C',
  sand: '#E7D6BF',
  amber: '#C68C4F',
  mint: '#DDEFE5',
  peach: '#F7E6DA',
  white: '#FFFFFF',
  ink: '#13273C',
  inkSoft: '#5F7184',
};

const galleryItems: GalleryItem[] = [
  {
    id: 'hero',
    title: 'Launch in one move',
    subtitle: 'The hero shot should dominate the phone. The product, motion, and tower context all read immediately.',
    proof: 'You understand the device before you read a paragraph.',
    source: require('./assets/life-launch/main-throw-hero.jpg'),
    aspectRatio: 1280 / 853,
  },
  {
    id: 'support',
    title: 'Support arrives fast',
    subtitle: 'The support-state image proves the point of the system: flotation gets to the victim sooner.',
    proof: 'The pitch shifts from concept to outcome.',
    source: require('./assets/life-launch/support-state.png'),
    aspectRatio: 1536 / 1024,
  },
  {
    id: 'system',
    title: 'Mounted and ready',
    subtitle: 'The rack view shows this is part of tower workflow, not loose gear somebody has to hunt for.',
    proof: 'Operators can picture where it lives and how it gets used.',
    source: require('./assets/life-launch/hero-system.png'),
    aspectRatio: 1536 / 1024,
  },
  {
    id: 'product',
    title: 'Product close-up',
    subtitle: 'A clean close-up makes the equipment feel tangible, premium, and deliberate.',
    proof: 'It stops reading like a sketch and starts reading like equipment.',
    source: require('./assets/life-launch/product-closeup.jpg'),
    aspectRatio: 1280 / 853,
  },
];

const tabs: { key: TabKey; label: string }[] = [
  { key: 'visual', label: 'Visual' },
  { key: 'process', label: 'Process' },
  { key: 'proof', label: 'Proof' },
  { key: 'reserve', label: 'Reserve' },
];

const processSteps = [
  {
    id: 'spot',
    step: '01',
    title: 'Spot distress',
    body: 'A swimmer is in trouble. This is the panic moment where every second matters.',
  },
  {
    id: 'launch',
    step: '02',
    title: 'Launch from the chair',
    body: 'The guard grabs and throws immediately from the tower instead of wasting time finding gear.',
  },
  {
    id: 'stabilize',
    step: '03',
    title: 'Buy time fast',
    body: 'Flotation reaches the person sooner, making the full rescue more controllable.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('visual');
  const [activeImageId, setActiveImageId] = useState<string>('hero');
  const [modalImageId, setModalImageId] = useState<string | null>(null);

  const activeImage = useMemo(
    () => galleryItems.find((item) => item.id === activeImageId) ?? galleryItems[0],
    [activeImageId],
  );

  const modalImage = useMemo(
    () => galleryItems.find((item) => item.id === modalImageId) ?? null,
    [modalImageId],
  );

  const openInterest = async () => {
    const url = 'mailto:drakemey@gmail.com?subject=Life%20Launch%20interest&body=Put%20my%20name%20down%20for%20Life%20Launch.';
    await Linking.openURL(url);
  };

  const openModalFor = (id: string) => {
    setActiveImageId(id);
    setModalImageId(id);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar style="light" />

        <View style={styles.appShell}>
          <TopBar onReserve={openInterest} />

          <View style={styles.tabBar}>
            {tabs.map((tab) => {
              const active = tab.key === activeTab;
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={[styles.tabChip, active && styles.tabChipActive]}
                >
                  <Text style={[styles.tabChipText, active && styles.tabChipTextActive]}>{tab.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {activeTab === 'visual' && (
              <VisualScreen
                activeImage={activeImage}
                onOpenModal={openModalFor}
                onSelectImage={setActiveImageId}
                onJumpToProcess={() => setActiveTab('process')}
                onReserve={openInterest}
              />
            )}
            {activeTab === 'process' && (
              <ProcessScreen
                onShowStepImage={(id) => {
                  setActiveImageId(id);
                  setActiveTab('visual');
                }}
                onOpenModal={openModalFor}
              />
            )}
            {activeTab === 'proof' && (
              <ProofScreen
                activeImage={activeImage}
                onSelectImage={setActiveImageId}
                onOpenModal={openModalFor}
              />
            )}
            {activeTab === 'reserve' && <ReserveScreen onReserve={openInterest} />}
          </ScrollView>

          <View style={styles.bottomRail}>
            <Pressable style={styles.bottomSecondary} onPress={() => setActiveTab('process')}>
              <Text style={styles.bottomSecondaryText}>See the 3 steps</Text>
            </Pressable>
            <Pressable style={styles.bottomPrimary} onPress={openInterest}>
              <Text style={styles.bottomPrimaryText}>Put my name down</Text>
            </Pressable>
          </View>
        </View>

        <Modal visible={!!modalImage} transparent animationType="fade" onRequestClose={() => setModalImageId(null)}>
          <View style={styles.modalBackdrop}>
            <Pressable style={styles.modalDismiss} onPress={() => setModalImageId(null)}>
              <Text style={styles.modalDismissText}>Close</Text>
            </Pressable>
            {modalImage ? (
              <View style={styles.modalCard}>
                <Image
                  source={modalImage.source}
                  style={[styles.modalImage, { aspectRatio: modalImage.aspectRatio }]}
                  contentFit="contain"
                  transition={150}
                />
                <View style={styles.modalCaption}>
                  <Text style={styles.modalTitle}>{modalImage.title}</Text>
                  <Text style={styles.modalBody}>{modalImage.subtitle}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function TopBar({ onReserve }: { onReserve: () => void }) {
  return (
    <LinearGradient colors={[palette.navy, palette.navyDeep]} style={styles.topBar}>
      <View>
        <Text style={styles.topEyebrow}>Life Launch</Text>
        <Text style={styles.topTitle}>Phone-native demo</Text>
      </View>
      <Pressable style={styles.topButton} onPress={onReserve}>
        <Text style={styles.topButtonText}>Interest</Text>
      </Pressable>
    </LinearGradient>
  );
}

function VisualScreen({
  activeImage,
  onOpenModal,
  onSelectImage,
  onJumpToProcess,
  onReserve,
}: {
  activeImage: GalleryItem;
  onOpenModal: (id: string) => void;
  onSelectImage: (id: string) => void;
  onJumpToProcess: () => void;
  onReserve: () => void;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.heroFrame}>
        <Image
          source={activeImage.source}
          style={[styles.heroImage, { aspectRatio: activeImage.aspectRatio }]}
          contentFit="contain"
          transition={150}
        />

        <LinearGradient colors={['rgba(9, 25, 39, 0.06)', 'rgba(9, 25, 39, 0.82)']} style={styles.heroOverlay}>
          <View style={styles.heroBadgeRow}>
            <Badge label="Show the picture first" tone="light" />
            <Badge label="Tap for full frame" tone="light" />
          </View>
          <Text style={styles.heroTitle}>{activeImage.title}</Text>
          <Text style={styles.heroSubtitle}>{activeImage.subtitle}</Text>
          <View style={styles.heroActionRow}>
            <PrimaryButton label="Open full-screen" onPress={() => onOpenModal(activeImage.id)} />
            <GhostButton label="See the 3-step process" onPress={onJumpToProcess} />
          </View>
        </LinearGradient>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbRail}>
        {galleryItems.map((item) => {
          const active = item.id === activeImage.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectImage(item.id)}
              style={[styles.thumbCard, active && styles.thumbCardActive]}
            >
              <Image source={item.source} style={styles.thumbImage} contentFit="cover" transition={100} />
              <Text style={[styles.thumbTitle, active && styles.thumbTitleActive]}>{item.title}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.bottomSheetCard}>
        <Text style={styles.sheetEyebrow}>Split-second decision</Text>
        <Text style={styles.sheetTitle}>See it. Get it. Put your name down.</Text>
        <Text style={styles.sheetBody}>
          The phone should hit the user with the image first, then the three-step rescue story, then one obvious next move.
        </Text>
        <View style={styles.microFlowRow}>
          <MicroFlowPill label="1. Distress" />
          <MicroFlowPill label="2. Throw" />
          <MicroFlowPill label="3. Support" />
        </View>
        <View style={styles.valueCardsRow}>
          <MiniSignalCard title="What it is" body="Tower-mounted rescue launcher" tone="sand" />
          <MiniSignalCard title="Why it matters" body="Flotation arrives faster" tone="mint" />
        </View>
        <View style={styles.ctaStack}>
          <PrimaryButton label="Put my name down" onPress={onReserve} />
          <SecondaryButton label="Open the hero image full-screen" onPress={() => onOpenModal(activeImage.id)} />
        </View>
      </View>
    </View>
  );
}

function ProcessScreen({
  onShowStepImage,
  onOpenModal,
}: {
  onShowStepImage: (id: string) => void;
  onOpenModal: (id: string) => void;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.processHeroCard}>
        <Text style={styles.sheetEyebrow}>The process</Text>
        <Text style={styles.sheetTitle}>Three beats. No wall of text.</Text>
        <Text style={styles.sheetBody}>
          This needs to read like a fast rescue sequence, not a brochure. The user should understand the motion in seconds.
        </Text>
      </View>

      {processSteps.map((step, index) => (
        <ProcessCard key={step.id} step={step.step} title={step.title} body={step.body} index={index} />
      ))}

      <View style={styles.dualPreviewRow}>
        <ProofPreview
          title="Throw proof"
          image={galleryItems[0]}
          onOpen={() => onShowStepImage('hero')}
          onExpand={() => onOpenModal('hero')}
        />
        <ProofPreview
          title="Outcome proof"
          image={galleryItems[1]}
          onOpen={() => onShowStepImage('support')}
          onExpand={() => onOpenModal('support')}
        />
      </View>
    </View>
  );
}

function ProofScreen({
  activeImage,
  onSelectImage,
  onOpenModal,
}: {
  activeImage: GalleryItem;
  onSelectImage: (id: string) => void;
  onOpenModal: (id: string) => void;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.panelCard}>
        <Text style={styles.sheetEyebrow}>Why someone says yes</Text>
        <Text style={styles.sheetTitle}>Every frame answers one buyer question.</Text>
      </View>

      {galleryItems.map((item) => {
        const active = item.id === activeImage.id;
        return (
          <Pressable
            key={item.id}
            onPress={() => onSelectImage(item.id)}
            style={[styles.proofCard, active && styles.proofCardActive]}
          >
            <View style={styles.proofImageWrap}>
              <Image source={item.source} style={styles.proofImage} contentFit="cover" transition={100} />
            </View>
            <View style={styles.proofCopy}>
              <Text style={styles.proofTitle}>{item.title}</Text>
              <Text style={styles.proofBody}>{item.proof}</Text>
              <SecondaryButton label="Inspect full frame" onPress={() => onOpenModal(item.id)} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function ReserveScreen({ onReserve }: { onReserve: () => void }) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.reserveCard}>
        <Text style={styles.reserveEyebrow}>Interest capture</Text>
        <Text style={styles.reserveTitle}>Make the decision easy.</Text>
        <Text style={styles.reserveBody}>
          If the picture reads and the process makes sense, the next move should be one big button. No hunting. No desktop contact-form junk.
        </Text>

        <View style={styles.reserveChecklist}>
          <ChecklistRow text="See the product in context immediately" />
          <ChecklistRow text="Understand the 3-step rescue flow in seconds" />
          <ChecklistRow text="Hit one obvious interest action" />
        </View>

        <PrimaryButton label="Put my name down" onPress={onReserve} />
        <Text style={styles.reserveFooter}>Current action opens an interest email draft so the concept can collect hand-raiser responses right now.</Text>
      </View>
    </View>
  );
}

function Badge({ label, tone }: { label: string; tone: 'light' | 'dark' }) {
  return (
    <View style={[styles.badge, tone === 'light' ? styles.badgeLight : styles.badgeDark]}>
      <Text style={[styles.badgeText, tone === 'light' ? styles.badgeTextLight : styles.badgeTextDark]}>{label}</Text>
    </View>
  );
}

function MiniSignalCard({ title, body, tone }: { title: string; body: string; tone: 'sand' | 'mint' }) {
  return (
    <View style={[styles.miniSignalCard, tone === 'sand' ? styles.miniSignalSand : styles.miniSignalMint]}>
      <Text style={styles.miniSignalTitle}>{title}</Text>
      <Text style={styles.miniSignalBody}>{body}</Text>
    </View>
  );
}

function MicroFlowPill({ label }: { label: string }) {
  return (
    <View style={styles.microFlowPill}>
      <Text style={styles.microFlowPillText}>{label}</Text>
    </View>
  );
}

function ProcessCard({ step, title, body, index }: { step: string; title: string; body: string; index: number }) {
  const tones = [styles.processToneAlert, styles.processToneAction, styles.processToneSuccess];
  return (
    <View style={[styles.processCard, tones[index] ?? styles.processToneAction]}>
      <Text style={styles.processStep}>{step}</Text>
      <View style={styles.processCopy}>
        <Text style={styles.processTitle}>{title}</Text>
        <Text style={styles.processBody}>{body}</Text>
      </View>
    </View>
  );
}

function ProofPreview({
  title,
  image,
  onOpen,
  onExpand,
}: {
  title: string;
  image: GalleryItem;
  onOpen: () => void;
  onExpand: () => void;
}) {
  return (
    <View style={styles.previewCard}>
      <Image source={image.source} style={styles.previewImage} contentFit="cover" transition={100} />
      <Text style={styles.previewTitle}>{title}</Text>
      <Text style={styles.previewBody}>{image.proof}</Text>
      <View style={styles.previewActions}>
        <GhostButton label="Show" onPress={onOpen} compact />
        <GhostButton label="Expand" onPress={onExpand} compact />
      </View>
    </View>
  );
}

function ChecklistRow({ text }: { text: string }) {
  return (
    <View style={styles.checklistRow}>
      <View style={styles.checkDot} />
      <Text style={styles.checkText}>{text}</Text>
    </View>
  );
}

function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function GhostButton({
  label,
  onPress,
  compact = false,
}: {
  label: string;
  onPress: () => void;
  compact?: boolean;
}) {
  return (
    <Pressable style={[styles.ghostButton, compact && styles.ghostButtonCompact]} onPress={onPress}>
      <Text style={[styles.ghostButtonText, compact && styles.ghostButtonTextCompact]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.navyDeep,
  },
  appShell: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  topBar: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topEyebrow: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  topTitle: {
    color: palette.white,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  topButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  topButtonText: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: palette.bg,
  },
  tabChip: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.56)',
    borderWidth: 1,
    borderColor: 'rgba(18,39,59,0.08)',
  },
  tabChipActive: {
    backgroundColor: palette.white,
    borderColor: 'rgba(18,39,59,0.14)',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  tabChipText: {
    color: palette.inkSoft,
    fontSize: 13,
    fontWeight: '700',
  },
  tabChipTextActive: {
    color: palette.ink,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 120,
  },
  screenStack: {
    gap: 14,
  },
  heroFrame: {
    minHeight: heroHeight,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: palette.navy,
    marginTop: 4,
  },
  heroImage: {
    width: '100%',
    height: heroHeight,
    backgroundColor: '#091D2E',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
    padding: 18,
    gap: 10,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeLight: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  badgeDark: {
    backgroundColor: 'rgba(17,44,69,0.08)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  badgeTextLight: {
    color: palette.white,
  },
  badgeTextDark: {
    color: palette.navy,
  },
  heroTitle: {
    color: palette.white,
    fontSize: 31,
    lineHeight: 35,
    fontWeight: '800',
    maxWidth: '92%',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: '92%',
  },
  heroActionRow: {
    gap: 10,
    marginTop: 4,
  },
  thumbRail: {
    paddingVertical: 4,
    gap: 10,
  },
  thumbCard: {
    width: 126,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(18,39,59,0.08)',
  },
  thumbCardActive: {
    borderColor: 'rgba(17,44,69,0.28)',
    backgroundColor: palette.white,
  },
  thumbImage: {
    width: '100%',
    height: 88,
    backgroundColor: palette.sand,
  },
  thumbTitle: {
    color: palette.inkSoft,
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  thumbTitleActive: {
    color: palette.ink,
  },
  bottomSheetCard: {
    backgroundColor: palette.panelSoft,
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 12,
  },
  sheetEyebrow: {
    color: palette.navySoft,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sheetTitle: {
    color: palette.ink,
    fontSize: 28,
    lineHeight: 31,
    fontWeight: '800',
  },
  sheetBody: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  microFlowRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  microFlowPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
  },
  microFlowPillText: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  valueCardsRow: {
    gap: 10,
  },
  miniSignalCard: {
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
  },
  miniSignalSand: {
    backgroundColor: 'rgba(231,214,191,0.42)',
    borderColor: 'rgba(198,140,79,0.20)',
  },
  miniSignalMint: {
    backgroundColor: 'rgba(221,239,229,0.7)',
    borderColor: 'rgba(70,131,98,0.14)',
  },
  miniSignalTitle: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  miniSignalBody: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 20,
  },
  ctaStack: {
    gap: 10,
  },
  processHeroCard: {
    backgroundColor: palette.panelSoft,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 8,
    marginTop: 4,
  },
  processCard: {
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  processToneAlert: {
    backgroundColor: palette.peach,
    borderColor: 'rgba(177,109,63,0.14)',
  },
  processToneAction: {
    backgroundColor: 'rgba(227,236,245,0.78)',
    borderColor: 'rgba(53,82,108,0.14)',
  },
  processToneSuccess: {
    backgroundColor: palette.mint,
    borderColor: 'rgba(70,131,98,0.14)',
  },
  processStep: {
    color: palette.navy,
    fontSize: 18,
    fontWeight: '900',
    width: 38,
  },
  processCopy: {
    flex: 1,
    gap: 4,
  },
  processTitle: {
    color: palette.ink,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
  },
  processBody: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 20,
  },
  dualPreviewRow: {
    gap: 12,
  },
  previewCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
    paddingBottom: 14,
  },
  previewImage: {
    width: '100%',
    height: 170,
    backgroundColor: palette.sand,
  },
  previewTitle: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '800',
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  previewBody: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 14,
    paddingTop: 6,
  },
  previewActions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  panelCard: {
    backgroundColor: palette.panelSoft,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.line,
    marginTop: 4,
  },
  proofCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.line,
  },
  proofCardActive: {
    borderColor: 'rgba(17,44,69,0.22)',
  },
  proofImageWrap: {
    width: '100%',
    height: 200,
    backgroundColor: palette.sand,
  },
  proofImage: {
    width: '100%',
    height: '100%',
  },
  proofCopy: {
    padding: 16,
    gap: 8,
  },
  proofTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  proofBody: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 20,
  },
  reserveCard: {
    backgroundColor: palette.white,
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 14,
    marginTop: 4,
  },
  reserveEyebrow: {
    color: palette.navySoft,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  reserveTitle: {
    color: palette.ink,
    fontSize: 29,
    lineHeight: 32,
    fontWeight: '800',
  },
  reserveBody: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  reserveChecklist: {
    gap: 10,
    paddingVertical: 4,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: palette.amber,
    marginTop: 6,
  },
  checkText: {
    flex: 1,
    color: palette.ink,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  reserveFooter: {
    color: palette.inkSoft,
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: palette.navy,
    borderRadius: 18,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: palette.white,
    borderRadius: 18,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  ghostButton: {
    borderRadius: 16,
    minHeight: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  ghostButtonCompact: {
    minHeight: 38,
    paddingHorizontal: 12,
    borderColor: palette.line,
    backgroundColor: palette.panel,
  },
  ghostButtonText: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '700',
  },
  ghostButtonTextCompact: {
    color: palette.ink,
    fontSize: 13,
  },
  bottomRail: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 16,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 249, 241, 0.94)',
    borderWidth: 1,
    borderColor: palette.line,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  bottomSecondary: {
    flex: 1,
    borderRadius: 18,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
  },
  bottomSecondaryText: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  bottomPrimary: {
    flex: 1.2,
    borderRadius: 18,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.navy,
  },
  bottomPrimaryText: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(4, 12, 20, 0.92)',
    justifyContent: 'center',
    padding: 18,
  },
  modalDismiss: {
    position: 'absolute',
    top: 54,
    right: 18,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  modalDismissText: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '700',
  },
  modalCard: {
    backgroundColor: 'rgba(10, 30, 48, 0.92)',
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 14,
  },
  modalImage: {
    width: '100%',
    maxHeight: screenHeight * 0.58,
    backgroundColor: '#081522',
    borderRadius: 18,
  },
  modalCaption: {
    gap: 6,
  },
  modalTitle: {
    color: palette.white,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '800',
  },
  modalBody: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    lineHeight: 20,
  },
});

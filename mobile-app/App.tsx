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
const heroHeight = Math.max(390, Math.min(560, Math.round(screenHeight * 0.58)));

type TabKey = 'visual' | 'process' | 'proof' | 'reserve';

type GalleryItem = {
  id: string;
  label: string;
  title: string;
  caption: string;
  proof: string;
  question: string;
  answer: string;
  source: number;
  aspectRatio: number;
};

const palette = {
  ink: '#10273F',
  inkDeep: '#091A29',
  inkSoft: '#4B647C',
  cream: '#F6EFE4',
  creamStrong: '#FFF8EF',
  sand: '#E8D7BF',
  sandDeep: '#CFB18A',
  mint: '#DDEDE4',
  sky: '#E5F0F8',
  peach: '#F8E5D7',
  white: '#FFFFFF',
  line: 'rgba(16, 39, 63, 0.10)',
  lineStrong: 'rgba(16, 39, 63, 0.18)',
  gold: '#C58A4B',
  red: '#C96B5C',
  green: '#3F7A5E',
};

const galleryItems: GalleryItem[] = [
  {
    id: 'hero',
    label: 'Main scene',
    title: 'Launch in one move',
    caption: 'The throw happens right from the tower. The motion reads before the user reads anything else.',
    proof: 'You get the product and the use case in one glance.',
    question: 'What is this?',
    answer: 'A tower-mounted rescue launcher that gets flotation to the swimmer fast.',
    source: require('./assets/life-launch/main-throw-hero.jpg'),
    aspectRatio: 1280 / 853,
  },
  {
    id: 'support',
    label: 'Outcome',
    title: 'Support reaches the person fast',
    caption: 'The second image proves the point: flotation is already in play while the rescue continues.',
    proof: 'The idea turns into an outcome, not just a concept.',
    question: 'Why does it matter?',
    answer: 'Because flotation reaches the swimmer sooner and buys control in the worst seconds.',
    source: require('./assets/life-launch/support-state.png'),
    aspectRatio: 1536 / 1024,
  },
  {
    id: 'system',
    label: 'Integration',
    title: 'Mounted and ready on the chair',
    caption: 'This feels like part of lifeguard workflow, not random gear hidden somewhere nearby.',
    proof: 'Buyers can picture where it lives and how it gets used.',
    question: 'Where does it live?',
    answer: 'Right on the tower so the guard can react without losing time.',
    source: require('./assets/life-launch/hero-system.png'),
    aspectRatio: 1536 / 1024,
  },
  {
    id: 'product',
    label: 'Close-up',
    title: 'The device feels real and deliberate',
    caption: 'A clean product frame makes this feel like equipment, not a sketchy concept deck.',
    proof: 'The object has weight, finish, and credibility.',
    question: 'Does it feel credible?',
    answer: 'Yes. The close-up makes it read like a real product somebody can buy and mount.',
    source: require('./assets/life-launch/product-closeup.jpg'),
    aspectRatio: 1280 / 853,
  },
];

const tabs: { key: TabKey; label: string }[] = [
  { key: 'visual', label: 'Visual' },
  { key: 'process', label: 'Flow' },
  { key: 'proof', label: 'Proof' },
  { key: 'reserve', label: 'Interest' },
];

const processSteps = [
  {
    id: 'distress',
    step: '01',
    title: 'Spot distress',
    body: 'A swimmer is in trouble. The lifeguard needs a first move right now, not after rummaging for gear.',
    imageId: 'hero',
    tone: 'alert' as const,
  },
  {
    id: 'launch',
    step: '02',
    title: 'Launch from the chair',
    body: 'The guard throws immediately from the tower. The device is already mounted, visible, and ready.',
    imageId: 'system',
    tone: 'action' as const,
  },
  {
    id: 'support',
    step: '03',
    title: 'Buy time with flotation',
    body: 'The swimmer gets support fast, making the rest of the rescue more manageable.',
    imageId: 'support',
    tone: 'success' as const,
  },
];

const signalCards = [
  {
    title: 'See it fast',
    body: 'Lead with the hero image, not a block of copy.',
    tone: 'sand' as const,
  },
  {
    title: 'Get it fast',
    body: 'Three beats explain the rescue without making people study.',
    tone: 'sky' as const,
  },
  {
    title: 'Act fast',
    body: 'One obvious hand-raiser action closes the loop.',
    tone: 'mint' as const,
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
    const url =
      'mailto:drakemey@gmail.com?subject=Life%20Launch%20interest&body=Put%20my%20name%20down%20for%20Life%20Launch.';
    await Linking.openURL(url);
  };

  const openModalFor = (id: string) => {
    setActiveImageId(id);
    setModalImageId(id);
  };

  const jumpToImage = (id: string) => {
    setActiveImageId(id);
    setActiveTab('visual');
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
                onShowImage={jumpToImage}
                onOpenModal={openModalFor}
                onReserve={openInterest}
              />
            )}
            {activeTab === 'proof' && (
              <ProofScreen
                activeImageId={activeImageId}
                onSelectImage={setActiveImageId}
                onOpenModal={openModalFor}
                onReserve={openInterest}
              />
            )}
            {activeTab === 'reserve' && <ReserveScreen onReserve={openInterest} onShowHero={() => jumpToImage('hero')} />}
          </ScrollView>

          <View style={styles.bottomRail}>
            <Pressable style={styles.bottomSecondary} onPress={() => setActiveTab('process')}>
              <Text style={styles.bottomSecondaryText}>See the 3-step flow</Text>
            </Pressable>
            <Pressable style={styles.bottomPrimary} onPress={openInterest}>
              <Text style={styles.bottomPrimaryText}>Put my name down</Text>
            </Pressable>
          </View>
        </View>

        <Modal visible={!!modalImage} transparent animationType="fade" onRequestClose={() => setModalImageId(null)}>
          <View style={styles.modalBackdrop}>
            <Pressable style={styles.modalCloseButton} onPress={() => setModalImageId(null)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
            {modalImage ? (
              <View style={styles.modalCard}>
                <Image
                  source={modalImage.source}
                  style={[styles.modalImage, { aspectRatio: modalImage.aspectRatio }]}
                  contentFit="contain"
                  transition={120}
                />
                <View style={styles.modalCaption}>
                  <Text style={styles.modalEyebrow}>{modalImage.label}</Text>
                  <Text style={styles.modalTitle}>{modalImage.title}</Text>
                  <Text style={styles.modalBody}>{modalImage.caption}</Text>
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
    <LinearGradient colors={[palette.ink, palette.inkDeep]} style={styles.topBar}>
      <View style={styles.topCopy}>
        <Text style={styles.topEyebrow}>Life Launch</Text>
        <Text style={styles.topTitle}>Phone-first pitch surface</Text>
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
          contentFit="cover"
          transition={150}
        />
        <LinearGradient colors={['rgba(9, 26, 41, 0.00)', 'rgba(9, 26, 41, 0.86)']} style={styles.heroOverlay}>
          <View style={styles.heroBadgeRow}>
            <Badge label="Show the picture first" tone="light" />
            <Badge label="Tap full-screen" tone="light" />
          </View>
          <Text style={styles.heroKicker}>{activeImage.label}</Text>
          <Text style={styles.heroTitle}>{activeImage.title}</Text>
          <Text style={styles.heroBody}>{activeImage.caption}</Text>
          <View style={styles.heroActionRow}>
            <PrimaryButton label="Open full-screen" onPress={() => onOpenModal(activeImage.id)} />
            <GhostButton label="See the 3-step flow" onPress={onJumpToProcess} />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.statementCard}>
        <Text style={styles.statementEyebrow}>Split-second understanding</Text>
        <Text style={styles.statementTitle}>See it. Get it. Put your name down.</Text>
        <Text style={styles.statementBody}>
          This should feel like a clean mobile product page, not a desktop landing page crammed into a phone.
        </Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyRail}
      >
        {galleryItems.map((item) => (
          <Pressable key={item.id} style={styles.storyCard} onPress={() => onSelectImage(item.id)}>
            <View style={styles.storyImageWrap}>
              <Image source={item.source} style={styles.storyImage} contentFit="cover" transition={100} />
              <Pressable style={styles.storyExpandButton} onPress={() => onOpenModal(item.id)}>
                <Text style={styles.storyExpandButtonText}>Full</Text>
              </Pressable>
            </View>
            <View style={styles.storyCopy}>
              <Text style={styles.storyLabel}>{item.label}</Text>
              <Text style={styles.storyTitle}>{item.title}</Text>
              <Text style={styles.storyBody}>{item.proof}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.signalStack}>
        {signalCards.map((card) => (
          <SignalCard key={card.title} title={card.title} body={card.body} tone={card.tone} />
        ))}
      </View>

      <View style={styles.ctaCard}>
        <Text style={styles.ctaEyebrow}>Next move</Text>
        <Text style={styles.ctaTitle}>One action. No hunting.</Text>
        <Text style={styles.ctaBody}>
          If the image and flow make sense, the next move is one obvious button. That is the whole point.
        </Text>
        <PrimaryButton label="Put my name down" onPress={onReserve} />
      </View>
    </View>
  );
}

function ProcessScreen({
  onShowImage,
  onOpenModal,
  onReserve,
}: {
  onShowImage: (id: string) => void;
  onOpenModal: (id: string) => void;
  onReserve: () => void;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionEyebrow}>Rescue flow</Text>
        <Text style={styles.sectionTitle}>Three beats. No wall of text.</Text>
        <Text style={styles.sectionBody}>
          The user should understand the sequence in seconds: distress, launch, support.
        </Text>
      </View>

      {processSteps.map((step) => (
        <ProcessCard
          key={step.id}
          step={step.step}
          title={step.title}
          body={step.body}
          tone={step.tone}
          onShow={() => onShowImage(step.imageId)}
          onExpand={() => onOpenModal(step.imageId)}
        />
      ))}

      <View style={styles.ctaCard}>
        <Text style={styles.ctaEyebrow}>Decision</Text>
        <Text style={styles.ctaTitle}>The pitch should close right here.</Text>
        <Text style={styles.ctaBody}>When the sequence is obvious, the interest action should feel natural instead of forced.</Text>
        <PrimaryButton label="Put my name down" onPress={onReserve} />
      </View>
    </View>
  );
}

function ProofScreen({
  activeImageId,
  onSelectImage,
  onOpenModal,
  onReserve,
}: {
  activeImageId: string;
  onSelectImage: (id: string) => void;
  onOpenModal: (id: string) => void;
  onReserve: () => void;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionEyebrow}>Why somebody says yes</Text>
        <Text style={styles.sectionTitle}>Every frame answers a buyer question.</Text>
      </View>

      {galleryItems.map((item) => {
        const active = item.id === activeImageId;
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
              <Text style={styles.proofQuestion}>{item.question}</Text>
              <Text style={styles.proofAnswer}>{item.answer}</Text>
              <View style={styles.proofActionRow}>
                <GhostButton label="Show" onPress={() => onSelectImage(item.id)} compact />
                <GhostButton label="Full frame" onPress={() => onOpenModal(item.id)} compact />
              </View>
            </View>
          </Pressable>
        );
      })}

      <View style={styles.inlineCtaRow}>
        <PrimaryButton label="Put my name down" onPress={onReserve} />
      </View>
    </View>
  );
}

function ReserveScreen({
  onReserve,
  onShowHero,
}: {
  onReserve: () => void;
  onShowHero: () => void;
}) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.reserveHeroCard}>
        <Text style={styles.reserveEyebrow}>Interest capture</Text>
        <Text style={styles.reserveTitle}>Make the hand-raiser step dead simple.</Text>
        <Text style={styles.reserveBody}>
          No cramped form. No desktop junk. Just a clear next move once the product story lands.
        </Text>
      </View>

      <View style={styles.reserveChecklistCard}>
        <ChecklistRow text="Image first so the concept reads immediately" />
        <ChecklistRow text="Three-step rescue flow instead of a long explanation" />
        <ChecklistRow text="One obvious action to capture interest" />
      </View>

      <View style={styles.reserveActionCard}>
        <PrimaryButton label="Put my name down" onPress={onReserve} />
        <SecondaryButton label="Re-open the hero visual" onPress={onShowHero} />
        <Text style={styles.reserveFooter}>
          Current action opens an interest email draft so responses can be collected now while the visual story is still being sharpened.
        </Text>
      </View>
    </View>
  );
}

function SignalCard({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: 'sand' | 'sky' | 'mint';
}) {
  return (
    <View
      style={[
        styles.signalCard,
        tone === 'sand' ? styles.signalCardSand : tone === 'sky' ? styles.signalCardSky : styles.signalCardMint,
      ]}
    >
      <Text style={styles.signalTitle}>{title}</Text>
      <Text style={styles.signalBody}>{body}</Text>
    </View>
  );
}

function ProcessCard({
  step,
  title,
  body,
  tone,
  onShow,
  onExpand,
}: {
  step: string;
  title: string;
  body: string;
  tone: 'alert' | 'action' | 'success';
  onShow: () => void;
  onExpand: () => void;
}) {
  return (
    <View
      style={[
        styles.processCard,
        tone === 'alert' ? styles.processAlert : tone === 'action' ? styles.processAction : styles.processSuccess,
      ]}
    >
      <View style={styles.processHeaderRow}>
        <Text style={styles.processStep}>{step}</Text>
        <View style={styles.processTitleBlock}>
          <Text style={styles.processTitle}>{title}</Text>
          <Text style={styles.processBody}>{body}</Text>
        </View>
      </View>
      <View style={styles.processActionRow}>
        <GhostButton label="Show visual" onPress={onShow} compact />
        <GhostButton label="Open full" onPress={onExpand} compact />
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

function Badge({ label, tone }: { label: string; tone: 'light' | 'dark' }) {
  return (
    <View style={[styles.badge, tone === 'light' ? styles.badgeLight : styles.badgeDark]}>
      <Text style={[styles.badgeText, tone === 'light' ? styles.badgeTextLight : styles.badgeTextDark]}>{label}</Text>
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
    backgroundColor: palette.inkDeep,
  },
  appShell: {
    flex: 1,
    backgroundColor: palette.cream,
  },
  topBar: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topCopy: {
    gap: 4,
  },
  topEyebrow: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.3,
  },
  topTitle: {
    color: palette.white,
    fontSize: 20,
    fontWeight: '800',
  },
  topButton: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
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
    backgroundColor: palette.creamStrong,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  tabChip: {
    flex: 1,
    minHeight: 42,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabChipActive: {
    backgroundColor: palette.ink,
    borderColor: palette.ink,
  },
  tabChipText: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  tabChipTextActive: {
    color: palette.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 132,
  },
  screenStack: {
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heroFrame: {
    minHeight: heroHeight,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: palette.ink,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    padding: 18,
    gap: 10,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroKicker: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: palette.white,
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '900',
    maxWidth: '88%',
  },
  heroBody: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: '92%',
  },
  heroActionRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  statementCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    padding: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: palette.line,
  },
  statementEyebrow: {
    color: palette.gold,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  statementTitle: {
    color: palette.ink,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900',
  },
  statementBody: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  storyRail: {
    gap: 14,
    paddingRight: 16,
  },
  storyCard: {
    width: 304,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
    marginRight: 14,
  },
  storyImageWrap: {
    height: 246,
    backgroundColor: palette.ink,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyExpandButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(9, 26, 41, 0.72)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  storyExpandButtonText: {
    color: palette.white,
    fontSize: 12,
    fontWeight: '800',
  },
  storyCopy: {
    padding: 16,
    gap: 6,
  },
  storyLabel: {
    color: palette.gold,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  storyTitle: {
    color: palette.ink,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '800',
  },
  storyBody: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 20,
  },
  signalStack: {
    gap: 12,
  },
  signalCard: {
    borderRadius: 22,
    padding: 16,
    gap: 6,
    borderWidth: 1,
  },
  signalCardSand: {
    backgroundColor: palette.sand,
    borderColor: 'rgba(160, 114, 64, 0.20)',
  },
  signalCardSky: {
    backgroundColor: palette.sky,
    borderColor: 'rgba(54, 88, 120, 0.14)',
  },
  signalCardMint: {
    backgroundColor: palette.mint,
    borderColor: 'rgba(63, 122, 94, 0.16)',
  },
  signalTitle: {
    color: palette.ink,
    fontSize: 17,
    fontWeight: '800',
  },
  signalBody: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 20,
  },
  sectionCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    padding: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: palette.line,
  },
  sectionEyebrow: {
    color: palette.gold,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900',
  },
  sectionBody: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  processCard: {
    borderRadius: 24,
    padding: 18,
    gap: 14,
    borderWidth: 1,
  },
  processAlert: {
    backgroundColor: '#FFF3EE',
    borderColor: 'rgba(201, 107, 92, 0.20)',
  },
  processAction: {
    backgroundColor: '#FFF8EF',
    borderColor: 'rgba(197, 138, 75, 0.20)',
  },
  processSuccess: {
    backgroundColor: '#EEF8F2',
    borderColor: 'rgba(63, 122, 94, 0.20)',
  },
  processHeaderRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  processStep: {
    color: palette.ink,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900',
    width: 40,
  },
  processTitleBlock: {
    flex: 1,
    gap: 5,
  },
  processTitle: {
    color: palette.ink,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '800',
  },
  processBody: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 21,
  },
  processActionRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  proofCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.line,
  },
  proofCardActive: {
    borderColor: palette.ink,
    shadowColor: '#091A29',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  proofImageWrap: {
    height: 204,
    backgroundColor: palette.ink,
  },
  proofImage: {
    width: '100%',
    height: '100%',
  },
  proofCopy: {
    padding: 16,
    gap: 8,
  },
  proofQuestion: {
    color: palette.gold,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.05,
  },
  proofAnswer: {
    color: palette.ink,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
  },
  proofActionRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  inlineCtaRow: {
    marginTop: 4,
  },
  ctaCard: {
    backgroundColor: palette.ink,
    borderRadius: 26,
    padding: 20,
    gap: 10,
  },
  ctaEyebrow: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  ctaTitle: {
    color: palette.white,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
  },
  ctaBody: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 15,
    lineHeight: 22,
  },
  reserveHeroCard: {
    backgroundColor: palette.white,
    borderRadius: 26,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: palette.line,
  },
  reserveEyebrow: {
    color: palette.gold,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  reserveTitle: {
    color: palette.ink,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '900',
  },
  reserveBody: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  reserveChecklistCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: palette.line,
  },
  reserveActionCard: {
    backgroundColor: palette.creamStrong,
    borderRadius: 24,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: palette.line,
  },
  reserveFooter: {
    color: palette.inkSoft,
    fontSize: 13,
    lineHeight: 19,
  },
  checklistRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: palette.gold,
    marginTop: 6,
  },
  checkText: {
    flex: 1,
    color: palette.ink,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  bottomRail: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(255, 248, 239, 0.96)',
    borderWidth: 1,
    borderColor: palette.lineStrong,
    borderRadius: 24,
    padding: 10,
    shadowColor: '#091A29',
    shadowOpacity: 0.10,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  bottomSecondary: {
    flex: 1,
    minHeight: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 12,
  },
  bottomSecondaryText: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  bottomPrimary: {
    flex: 1.15,
    minHeight: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.ink,
    paddingHorizontal: 14,
  },
  bottomPrimaryText: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '800',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
  },
  badgeLight: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderColor: 'rgba(255,255,255,0.22)',
  },
  badgeDark: {
    backgroundColor: palette.ink,
    borderColor: palette.ink,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  badgeTextLight: {
    color: palette.white,
  },
  badgeTextDark: {
    color: palette.white,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 18,
    paddingHorizontal: 18,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 18,
    paddingHorizontal: 18,
    backgroundColor: palette.creamStrong,
    borderWidth: 1,
    borderColor: palette.lineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  ghostButton: {
    minHeight: 46,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButtonCompact: {
    minHeight: 40,
    backgroundColor: palette.white,
    borderColor: palette.lineStrong,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(9, 26, 41, 0.94)',
    paddingHorizontal: 14,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 22,
    right: 18,
    zIndex: 5,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  modalCloseButtonText: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '800',
  },
  modalCard: {
    gap: 16,
  },
  modalImage: {
    width: '100%',
    maxHeight: '72%',
    alignSelf: 'center',
  },
  modalCaption: {
    gap: 6,
    paddingHorizontal: 4,
  },
  modalEyebrow: {
    color: 'rgba(255,255,255,0.66)',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  modalTitle: {
    color: palette.white,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
  },
  modalBody: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 15,
    lineHeight: 22,
  },
});
